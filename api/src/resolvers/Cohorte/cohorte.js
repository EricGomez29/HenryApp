import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';
import { existUser } from '../../consultasBD/user';
import { existCohorte, pullCohorte, pushCohorte } from '../../consultasBD/cohorte';

export const addUserCohorte = async(number, username) => {
    var user = await existUser(username);
    var exist = await Cohorte.findOne({_id: user.cohorte});
    if (exist.number ===  number){
        throw new Error (`El Usuario ${username} pertenece a este Cohorte.`);
    }else if (number < exist.number){
        throw new Error (`No se puede agregar usuarios a Cohortes anteriores`);
    }
    // Busco si existe el cohorte
    const cohorte = await existCohorte(number);
    // Guardo el _id de ese alumno en el array Users de Cohorte
    pushCohorte(number, user._id);
    //Borro de un anterior cohorte al usuario
    pullCohorte(user._id, user.cohorte);
    // Guardo el _id de ese Cohorte en Users 
    await User.findOneAndUpdate({"username": username}, {"cohorte": cohorte._id});
    return await Cohorte.findOne({"number": number}).populate('users');
};



export const addCohorteInstructor = async (username, cohorte) => {
    // addCohorteInstructor(username, cohorte),
    const user = await existUser(username);
    //veo si el cohorte tiene instructor
    console.log(user);
    const cohor = await Cohorte.findOne({number: cohorte});
    //si no, le agrego el tanto al cohorte como a la propiedad isInstructor
    console.log(!cohor.instructor);

    await User.findOneAndUpdate({username: username}, {isInstructor: true});
    await Cohorte.findOneAndUpdate({number: cohorte}, {instructor: user._id});
    // me fijo si el usuario es instructor en otros cohortes para setearle la propiedad isIntructor
    const res = await Cohorte.find({instructor: cohor.instructor});
    if (res.length === 0){
        await User.findOneAndUpdate({_id: cohor.instructor},{isInstructor: false});
    }
    
    return await Cohorte.findOne({number: cohorte}).populate("users").populate('instructor');
    
}


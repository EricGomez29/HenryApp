import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';
import { existUser } from '../../consultasBD/user';
import { existCohorte, pullCohorte, pushCohorte } from '../../consultasBD/cohorte';
import { pullStandUp } from '../../consultasBD/standUp';

//AGREGAR COHORTE
export const addCohorte = async() => {
    //Busco los cohortes
    const cohor = await Cohorte.find()
    return await Cohorte.create({"number": cohor.length + 1});
};
    
//AGREGAR FECHA DE INICIO AL COHORTE
export const editFechaCohorte = async (fecha, id) => {
    await Cohorte.findOneAndUpdate({_id: id}, {date: fecha});
    return Cohorte.findOne({_id: id}).populate('users');
}

//AGREGAR USUARIO AL COHORTE
export const addUserCohorte = async(number, username) => {
    var user = await existUser(username);
    if(user.cohorte !== null){
        var exist = await Cohorte.findOne({number: user.cohorte});
        if (exist.number ===  number){
            throw new Error (`El Usuario ${username} pertenece a este Cohorte.`);
        }else if (number < exist.number){
            throw new Error (`No se puede agregar usuarios a Cohortes anteriores`);
        }
    }
    // Busco si existe el cohorte
    const cohorte = await existCohorte(number);
    // Guardo el _id de ese alumno en el array Users de Cohorte
    pushCohorte(cohorte.number, user._id);
    //Borro de un anterior cohorte al usuario
    if(user.cohorte){
        pullCohorte(user.cohorte, user._id);
    }
    // Guardo el _id de ese Cohorte en Users 
    await User.findOneAndUpdate({"username": username}, {"cohorte": cohorte.number});
    return await Cohorte.findOne({"number": number}).populate('users').populate('instructor');
};

//REMOVER USUARIO DEL COHORTE
export const removeUserCohorte = async(username) => {
    const user = await existUser(username);
    if(user.cohorte === null){
        throw new Error(`El Usuario ${username} no esta agregado a ningun cohorte`);
    }
    await User.findOneAndUpdate({"username": username}, {"cohorte": null, standUp: null});
    await pullCohorte(user.cohorte, user._id);
    //Si el usuario pertenece a Stand dentro de un cohorte es borrado del Stand
    if(user.stand){
        pullStandUp(user.stand, user._id, "users")
    }
    return await Cohorte.findOne({"number": user.cohorte}).populate("users").populate('instructor')
}

//AGREGAR INSTRUCTOR AL COHORTE
export const addCohorteInstructor = async (username, cohorte) => {
    // addCohorteInstructor(username, cohorte),
    const user = await existUser(username);
    //veo si el cohorte tiene instructor
    const cohor = await Cohorte.findOne({number: cohorte});
    //si no, le agrego el tanto al cohorte como a la propiedad isInstructor
    if(user.cohorte >= cohorte){
        throw new Error(`El usuario ${username} no puede ser Instructor de un cohorte anterior o igual al que pertenece.`)
    }
    await User.findOneAndUpdate({username: username}, {isInstructor: true});
    await Cohorte.findOneAndUpdate({number: cohorte}, {instructor: user._id});
    // me fijo si el usuario es instructor en otros cohortes para setearle la propiedad isIntructor
    const res = await Cohorte.find({instructor: cohor.instructor});
    if (res.length === 0){
        await User.findOneAndUpdate({_id: cohor.instructor},{isInstructor: false});
    }
    return await Cohorte.findOne({number: cohorte}).populate("users").populate('instructor');
}
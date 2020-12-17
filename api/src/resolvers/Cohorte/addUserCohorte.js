import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';
import { existUser } from '../../consultasBD/user';
import { existCohorte } from '../../consultasBD/cohorte';

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
    await Cohorte.findOneAndUpdate({"number": number},
    {
        $push : {
            users : user._id 
        }
    });
    await Cohorte.findOneAndUpdate({"_id": user.cohorte},
    {
        $pull : {
            users : user._id
        }
    });
    // Guardo el _id de ese Cohorte en Users 
    await User.findOneAndUpdate({"username": username}, {"cohorte": cohorte._id});
    return await Cohorte.findOne({"number": number}).populate('users');
};

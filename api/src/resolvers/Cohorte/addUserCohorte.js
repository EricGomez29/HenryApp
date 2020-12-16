import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';
import { existUser } from '../../consultasBD/user';
import { existCohorte } from '../../consultasBD/user';

export const addUserCohorte = async(number, username) => {
    var user = existUser(username)
    if (parseInt(number) ===  user.cohorte){
        throw new Error (`El Usuario ${username} pertenece a este Cohorte.`);
    }else if (parseInt(number) < user.cohorte){
        throw new Error (`No se puede agregar usuarios a Cohortes anteriores`);
    }
    // Busco si existe el cohorte
    const cohorte = existCohorte(number);
    // Guardo el username de ese alumno en el array Users de Cohorte
    await User.findOneAndUpdate({"username": username}, {"cohorte": cohorte})
    await Cohorte.findOneAndUpdate({"number": number},
    {
        $push : {
            users : {username} 
        }
    });
    return await (await Cohorte.findOne({"Number": number}));
};

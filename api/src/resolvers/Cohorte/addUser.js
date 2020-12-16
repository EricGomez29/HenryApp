import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';

const addUserCohorte = async(number, username) => {
    const user = await User.find({"username": username});
    if (user.length === 0){
        throw new Error (`El Usuario ${username} no existe.`);
    };    
    if (parseInt(number) ===  user[0].cohorte){
        throw new Error (`El Usuario ${username} pertenece a este Cohorte.`);
    }else if (parseInt(number) < user[0].cohorte){
        throw new Error (`No se puede agregar usuarios a Cohortes anteriores`);
    }
    // Busco si existe el cohorte
    const cohorte = await Cohorte.findOne({"Number": number})
    if (!cohorte){
        throw new Error("El Cohorte no existe")
    }
    // Guardo el username de ese alumno en el array Users de Cohorte
    await User.findOneAndUpdate({"username": username}, {"cohorte": number})
    await Cohorte.findOneAndUpdate({"Number": number},
    {
        $push : {
            Users : {username} 
        }
    });
    await Cohorte.findOneAndUpdate({"Number": user[0].cohorte},
    {
        $pull : {
            Users : {username} 
        }
    });
    return await Cohorte.findOne({"Number": number});
}

module.exports = addUserCohorte;
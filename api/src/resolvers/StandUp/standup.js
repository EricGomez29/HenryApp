import { pullStandUp, pushStandUp } from '../../consultasBD/standUp';
import Cohorte from '../../models/Cohorte'
import StandUp from '../../models/Stand-Up';
import User from '../../models/Users';

export const addStandUp = async ( cohorte ) =>{
    const cohor = await Cohorte.findOne({number: cohorte})
    if(!cohor){
        throw new Error(`El Cohorte ${cohorte} no existe`)
    } 
    const stand = await StandUp.find({cohorte: cohorte})
    return await StandUp.create({
        name: `WEB_FT_${cohorte}_GROUP_${stand.length + 1}`,
        cohorte: cohorte,
        number: stand.length + 1
    });
}

export const assignPMStandUp = async ( username, name ) =>{
    const stand = await StandUp.findOne({name: name})
    if(!stand){
        throw new Error(`El StandUp ${name} no existe`);
    }
    const user = await User.findOne({username: username});
    if(!user.cohorte){
        throw new Error(`El usuario ${username} no esta inscripto en ningun cohorte.`)
    }else if(user.standUp === name){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} es PM del Stand ${name}`)
    }
    await User.findOneAndUpdate( {username: username}, {isInstructor: true, standUp: name})
    pushStandUp(name, user.id, "PM");
    return await StandUp.findOne({name: name}).populate("PM");
};

 export const addUserStandUp = async ( username, name ) =>{
    const stand = await StandUp.findOne({name: name})
    if(!stand){
        throw new Error("El StandUp no existe");
    } 
    //Busco al usuario
    const user = await User.findOne({username: username});
    const cohorte = await Cohorte.findOne({number: stand.cohorte});
    console.log(user.cohorte);
    console.log(cohorte._id);
    console.log(user.cohorte !== cohorte._id);
    //Si no tiene Cohorte, es porque no esta asignado a ninguno
    if(!user.cohorte){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} no esta registrado.`)
    }else if(stand.users.includes(user._id)){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} ya pertenece al Stand ${name}`)
    }else if(user.cohorte !== cohorte._id){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} no puede ser agregado a un cohorte al cual no pertenece.`)
    }
    if (!user.standUp){
        pushStandUp(name, user.id, "users");
    }else{
        pullStandUp(user.standUp, user.id, "users");
        pushStandUp(name, user.id, "users");
    };
    await User.findOneAndUpdate({username: username}, {standUp: name});
    return await StandUp.findOne({name: name}).populate("users");
};

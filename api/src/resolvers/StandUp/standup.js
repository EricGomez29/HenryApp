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
        throw new Error("El StandUp no existe");
    }
    const user = await User.findOne({username: username});
    if(!user.cohorte){
        throw new Error(`El usuario ${username} no esta inscripto en ningun cohorte.`)
    }else if(!user.standUp === standUp.cohorte){
        throw new Error(`El usuario ${username} no esta incripto en el cohorte ${stand.cohorte}, sino en el cohorte ${user.cohorte}`);
    }else if(!user.isInstructor){
        await User.findOneAndUpdate({ username: username }, { isInstructor: true})
    }else if(user.standUp === name){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} ya pertenece al es PM del Stand ${name}`)
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
    const user = await User.findOne({username: username});
    if(!user.cohorte){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} no esta registrado.`)
    }else if(stand.users.includes(user._id)){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} ya pertenece al Stand ${name}`)
    }
    if (!user.standUp){
        pushStandUp(name, user.id, "users");
    }else{
        pullStandUp(user.standUp, user.id);
        pushStandUp(name, user.id, "users");
    };
    return await StandUp.findOne({name: name}).populate("users");
};

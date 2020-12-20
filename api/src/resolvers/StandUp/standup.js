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
    if(!user){
        throw new Error(`El usuario ${username} no esta registrado.`)
    }else if(user){

    }
    return await StandUp.findOneAndUpdate({name: name}, {
        $push: {
            PM: user._id
        }
    }).populate('PM');
 };

 export const addUserStandUp = async ( username, name ) =>{
    const stand = await StandUp.findOne({name: name})
    if(!stand){
        throw new Error("El StandUp no existe");
    }
    const user = await User.findOne({username: username});
    if(!user){
        throw new Error(`El usuario ${username} no esta registrado.`)
    }
    if (!username)
    return await StandUp.findOneAndUpdate({name: name}, {
        $push: {
            users: user._id
        }
    }).populate('users');
 };

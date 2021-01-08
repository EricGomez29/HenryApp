import { pullStandUp, pushStandUp } from '../../consultasBD/standUp';
import { pushUser, pullUser } from '../../consultasBD/user';
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
        number: stand.length + 1,
        linkMeet: "http://meet.google.com/new"
    });
}

export const assignPMStandUp = async ( username, name ) =>{
    const stand = await StandUp.findOne({name: name})
    if(!stand){
        throw new Error(`El StandUp ${name} no existe`);
    }
    const user = await User.findOne({username: username});
    console.log(user.standUp)
    if(!user.cohorte){
        throw new Error(`El usuario ${username} no esta inscripto en ningun cohorte.`)
    }else if(user.standUp===name){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} es alumno del Stand ${name}`)
    }else if(user.listPM.includes(name)){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} ya es PM del Stand ${name}`)
    }
    await User.findOneAndUpdate( {username: username}, {isPM: true, })
    pushUser(user._id, stand.name, "listPM");
    pushStandUp(name, user.id, "PM");
    return await StandUp.findOne({name: name}).populate("PM").populate('users');
};

export const removePMStandUp = async ( username, name ) =>{
    const stand = await StandUp.findOne({name: name})
    if(!stand){
        throw new Error(`El StandUp ${name} no existe`);
    }
    const user = await User.findOne({username: username});
    if(!user.cohorte){
        throw new Error(`El usuario ${username} no esta inscripto en ningun cohorte.`)
    }else if(!user.listPM.includes(name)){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} no es PM del Stand ${name}`)
    }
    if (user.listPM.length === 1){
        await User.findOneAndUpdate( {username: username}, {isPM: false})
    }
    pullUser(user._id, stand.name, "listPM");
    pullStandUp(name, user.id, "PM");
    return await StandUp.findOne({name: name}).populate("PM").populate('users');
};



export const addUserStandUp = async ( username, name ) =>{
    const stand = await StandUp.findOne({name: name})
    if(!stand){
        throw new Error("El StandUp no existe");
    } 
    //Busco al usuario
    const user = await User.findOne({username: username});
    const cohorte = await Cohorte.findOne({number: stand.cohorte});
    //Si no tiene Cohorte, es porque no esta asignado a ninguno
    if(!user.cohorte){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} no esta registrado.`)
    }else if(stand.users.includes(user._id)){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} ya pertenece al Stand ${name}`)
    }else if(user.cohorte.toString() !== cohorte.number.toString()){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} no puede ser agregado a un cohorte al cual no pertenece.`)
    }
    if (!user.standUp){
        pushStandUp(name, user.id, "users");
    }else{
        pullStandUp(user.standUp, user.id, "users");
        pushStandUp(name, user.id, "users");
    };
    await User.findOneAndUpdate({username: username}, {standUp: name});
    return await StandUp.findOne({name: name}).populate("users").populate('PM');
};

export const removeUserStandUp = async ( username ) => {
    const user = await User.findOne({username: username});
    if (!user){
        throw new Error(`El usuario ${username} no existe.`)
    }
    if (!user.standUp){
        throw new Error(`El usuario ${username} no pertenece a ningún Stand`);
    }
    pullStandUp(user.standUp, user._id, "users");
    await User.findOneAndUpdate({username: username}, {standUp: null})
    return await StandUp.findOne({name: user.standUp}).populate("users").populate('PM')
}

export const addLinkMeetStandUp = async (id, link, username) => {
    const user = await User.findOne({username: username});
    console.log(user)
    if(!user){
        throw new Error(`El usuario ${username} no existe`);
    }
    if(!user.isPM){
        throw new Error(`El usuario ${username} no PM, por lo tanto, no puede cambiar el link de Meet.`);
    }
    await StandUp.findOneAndUpdate({_id: id}, {linkMeet: link});
    return StandUp.findOne({_id: id}).populate('users').populate('PM');
}; 
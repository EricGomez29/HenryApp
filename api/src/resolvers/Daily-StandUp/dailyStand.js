import moment from 'moment'
import User from '../../models/Users';
import PairProgramming from '../../models/PairProgramming';
import Mesas from '../../models/Mesas';
import Cohorte from '../../models/Cohorte';
import DailyStand from '../../models/DailyStand';
import StandUp from '../../models/Stand-Up';

//Agregar Stand_up Daily de Usuario
export const addDailyStandUp = async( username, name ) => {
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    const user = await User.findOne({ username: username});
    if (!user.isPM){
        throw new Error(`No tiene los permisos para crear una Daily's StandUp`)
    }
    if (!user.listPM.includes(name)){
        throw new Error(`El usuario ${username} no es PM del Cohorte ${name}`);
    }
    const daily = await DailyStand.findOne({"name":user.standUp, fecha: fecha})
    if (daily){
        return daily;
    }
    return await DailyStand.create({fecha: fecha, linkMeet: "http://meet.com.ar", name: name, users: [users._id]})
}

//Agregar usuario al Stand-Up Daily dependiendo del grupo del cohorte y del dia.
export const addDailyUser = async(username) => {
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    //Veo Si existe el Usuario
    const user = await User.findOne({"username": username});
    if (!user.cohorte){
        throw new Error(`El usuario ${username} no pertenece a ningún Cohorte`);
    }else if(!user.standUp){
        throw new Error(`El usuario ${username} no pertenece a ningún grupo de Stand-Up`);
    }
    //Veo si ya esta creado la Daily del Stand
    const daily = await DailyStand.findOne({"name":user.standUp, fecha: fecha});
    if(!daily){
        throw new Error(`La Daily del grupo ${user.standUp} no ha sido creada aún.`)
    }else if(daily.users.includes(user._id)){
        throw new Error(`El usuario ${username} ya esta incluido en el grupo de Stand-Up`);
    }
    await DailyStand.findOneAndUpdate({name: user.standUp, fecha: fecha}, {
        $push: {
            users: user._id
        }
    })
    return await DailyStand.findOne({_id: daily._id}).populate('users')
}

//Remover usuario del Stand-Up Daily dependiendo del grupo del cohorte y del dia.
export const removeDailyUser = async(username) => {
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    //Veo Si existe el Usuario
    const user = await User.findOne({"username": username});
    if (!user.cohorte){
        throw new Error(`El usuario ${username} no pertenece a ningún Cohorte`);
    }else if(!user.standUp){
        throw new Error(`El usuario ${username} no pertenece a ningún grupo de Stand-Up`);
    }
    //Veo si ya esta creado la Daily del Stand
    const daily = await DailyStand.findOne({"name":user.standUp, fecha: fecha});
    if(!daily.users.includes(user._id)){
        throw new Error(`El usurio ${user.firstName} ${user.lastName} no ha sido sido agregado al Daily Stand-Up del grupo ${user.standUp}`)
    }else if(!daily.users.includes(user._id)){
        throw new Error(`El usuario ${username} no esta incluido en el grupo de Stand-Up`);
    }
    await DailyStand.findOneAndUpdate({name: user.standUp, fecha: fecha}, {
        $pull: {
            users: user._id
        }
    })
    return await DailyStand.findOne({_id: daily._id}).populate('users')
}

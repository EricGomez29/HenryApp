import moment from 'moment'
import User from '../../models/Users';
import PairProgramming from '../../models/PairProgramming';
import Mesas from '../../models/Mesas';
import Cohorte from '../../models/Cohorte';
import DailyStand from '../../models/DailyStand';
import StandUp from '../../models/Stand-Up';


export const addDailyStandUp = async( username, name ) => {
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    const user = await User.findOne({ username: username});
    if (!user.isPM){
        throw new Error(`No tiene los permisos para crear una Daily's StandUp`)
    }
    if (!user.listPM.includes(name)){
        throw new Error(`El usuario ${username} no es PM del Cohorte ${name}`);
    }
    const daily = await DailyStand.findOne({"name":user.standUp, fecha: fecha, name: name})
    if (daily){
        return daily;
    }
    return await DailyStand.create({fecha: fecha, linkMeet: "http://meet.com.ar"})
}

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
    await DailyStand.findOneAndUpdate({name: user.name, fecha: fecha}, {
        $push: {
            users: users._id
        }
    })
    return await DailyStand.findOne({_id: daily._id}).populate('users')
}

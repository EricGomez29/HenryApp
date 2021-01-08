import moment from 'moment'
import User from '../../models/Users';
import PairProgramming from '../../models/PairProgramming';
import Cohorte from '../../models/Cohorte';
import DailyStand from '../../models/DailyStand';
import StandUp from '../../models/Stand-Up';

//Agregar Stand_up Daily de Usuario
export const addDailyStandUp = async( username, name ) => {
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    const user = await User.findOne({ username: username});
    // ES PM?
    if (!user.isPM){
        throw new Error(`No tiene los permisos para crear una Daily's StandUp`)
    }
    // ES PM DE ESE GRUPO DE STAND-UP
    if (!user.listPM.includes(name)){
        throw new Error(`El usuario ${username} no es PM del Cohorte ${name}`);
    }
    // VEO SI YA ESTACREADO UN DAILY STAND PARA ESE DIA DE ESE GRUPO
    const daily = await DailyStand.findOne({"name":name, fecha: fecha});
    if (daily){
        console.log(daily)
        if(daily.users.includes(user._id)){
            throw new Error(`El Stand ya para el grupo ${name} del día ${fecha} ya ha sido creado.`);
        }
        await DailyStand.findOneAndUpdate({_id: daily._id}, {
            $push: {
                users: user._id
            }
        })
        return await DailyStand.findOne({_id: daily._id}).populate('users').populate('PM');
    }else{
        const number = await DailyStand.create({fecha: fecha, name: name, users: [user._id]});
        return await DailyStand.findOne({_id: number._id}).populate('users').populate('PM');
    }
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
export const removeDailyUser = async(username, name) => {
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    //Veo Si existe el Usuario
    const user = await User.findOne({"username": username});
    if(!user){
        throw new Error(`El Usuario ${username} no existe.`);
    }
    //Veo si ya esta creado la Daily del Stand
    const daily = await DailyStand.findOne({"name":name, fecha: fecha});
    if(!daily){
        throw new Error(`El Daily Stand-Up del grupo ${name} no fue creado.`)
    }
    if(!daily.users.includes(user._id)){
        throw new Error(`El usuario ${user.firstName} ${user.lastName} no ha sido sido agregado al Daily Stand-Up del grupo ${name}`)
    }
    await DailyStand.findOneAndUpdate({name: name, fecha: fecha}, {
        $pull: {
            users: user._id
        }
    })
    return await DailyStand.findOne({_id: daily._id}).populate('users')
}

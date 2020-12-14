import moment from 'moment'
import User from '../models/Users';
import PairProgramming from '../models/PairProgramming';
import Mesas from '../models/Mesas';

const agregarUsuarioMesa = async(username) => {
                    
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    //Veo Si existe el Usuario
    const user = await User.find({"username": username});
    // Si esta existe un PP creado para ese dia
    const existsCohorte = await PairProgramming.find({cohorte: user[0].cohorte, dia: fecha});
    var mesa= 0;
    if (existsCohorte.length === 0){
        //Agrego ese usuario a una mesa
        mesa = await Mesas.create( { linkMeet: "http://meet.com.ar", estado: "In Process", users: [user[0]._id]}, )
        //si no se creo ningun grupo de PP Creo una nueva tabla
        await PairProgramming.create({cohorte: user[0].cohorte, mesas: [mesa._id]});
    }else{
        const i = existsCohorte[0].mesas.length - 1;
        const mesas = existsCohorte[0].mesas[i];
        var valor = await Mesas.find({"_id": mesas});
        if (valor[0].users.length < 5){
            mesa = await Mesas.findOneAndUpdate( {"_id": valor[0]._id}, {
                $push : {
                    users: user[0]._id
                }
            });
            if (valor[0].users.length === 5 ){
                await Mesas.findOneAndUpdate( {"_id": valor[0]._id}, { estado: 'Full'});
            }
            }else{
                mesa = await Mesas.create( { linkMeet: "http://meet.com.ar", estado: "In Process", users: [user[0]._id]}, )
                //si no se creo ningun grupo de PP Creo una nueva tabla
                await PairProgramming.findOneAndUpdate({cohorte: user[0].cohorte, dia: fecha}, {
                    $push : {
                        mesas: mesa._id
                    }
                })
            }
    }
    return await Mesas.findOne({_id: mesa._id}).populate('users')
}

module.exports = agregarUsuarioMesa;
import moment from 'moment'
import User from '../../models/Users';
import PairProgramming from '../../models/PairProgramming';

export const addUserPairProgramming = async(username, id) => {
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    //Veo Si existe el Usuario
    const user = await User.findOne({"username": username});
    //Pregunto si el usuario esta incluido en algun cohorte
    // console.log(!user[0].cohorte);
    if (!user.cohorte){
        throw new Error ("El usuario no puede ser agregado a ningun grupo de PP debido a que no esta asignado a ningun cohorte")
    }
    // Si existe un PP creado para ese dia
    const existsUser = await PairProgramming.find({users: user._id, cohorte: user.cohorte, dia: fecha});
    // console.log(existUser[0]);
    if (existsUser[0]){
        throw new Error("El usuario ya ha sido agregado a un grupo de Pair Programming")
    }
    //Buscar si hay una mesa del mismo cohorte con menos de 5 personas
    var resp;
    if(id){
        resp = await PairProgramming.findOneAndUpdate({_id: id}, {
            $push: {
                users: user._id
            }
        })
    }else{ 
        resp = await PairProgramming.findOne(({users : {"$not":{"$size":5}}, dia: fecha, cohorte: user.cohorte}));
        if(!resp){
            resp = await PairProgramming.create({cohorte: user.cohorte, linkMeet: "http://meet.com/new", users: [user._id]})
        }else{
            await PairProgramming.findOneAndUpdate({_id: resp._id}, {
                $push: {
                    users: user._id
                }
            })
        }
    }
    return await PairProgramming.findOne({_id:resp._id}).populate('users')
}

export const removeUserPairProgramming = async (username) => {
    const fecha = moment(moment.now()).format("DD/MM/YYYY");
    //Veo Si existe el Usuario
    const user = await User.findOne({"username": username});
    //Pregunto si el usuario esta incluido en algun cohorte
    if (!user.cohorte){
        throw new Error(`Usuario ${username}: usted actualmente no se encuentra asignado a ningun cohorte`);
    }
    //Busco si el usuario esta incluido dentro de un PP
    const existsUser = await PairProgramming.find({users: user._id, cohorte: user.cohorte, dia: fecha});
    if(existsUser.length === 0){
        throw new Error(`El usuario ${username} no ha sido agregado a ningun Pair-Programming.`)
    }
    await PairProgramming.findOneAndUpdate({_id: existsUser[0]._id}, {
        $pull: {
            users: user._id
        }
    })
    const mesa = await PairProgramming.find({cohorte: user.cohorte});
    if(mesa[0].users.length === 0) {
        await PairProgramming.findOneAndDelete({cohorte: user.cohorte})
    }
    return await PairProgramming.findOne({_id: existsUser[0]._id}).populate('users')
};
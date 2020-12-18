import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';
import bcrypt from 'bcrypt';
import { existCohorte } from '../../consultasBD/cohorte';
import  {addUserCohorte} from '../Cohorte/cohorte'

export const regUser = async (username,firstName, lastName, cohorte,email, password) =>{
    const hash = await bcrypt.hash(password, 9);
    //verifico si existe el cohorte si desde el registro mandan uno
    if (cohorte) {
        cohorte = await existCohorte(cohorte);
        const user = await User.create( {username, firstName,lastName,cohorte:cohorte,email,password: hash});
        await Cohorte.findOneAndUpdate({"number": cohorte.number},
        {
            $push : {
                users : user._id 
            }
        });
        await Cohorte.findOne({"number": cohorte.number});
        return User.findOne({_id: user._id}).populate('cohorte');
    }
    return await User.create( {username, firstName,lastName,cohorte:cohorte,email,password: hash}).populate('cohorte');
}

export const editUsers = async (input) =>
    {
        if(input.password ){
            const hash = await bcrypt.hash(input.password, 9);
            return await  (User.findOneAndUpdate({ "username": input.username }, {...input, password: hash}))
        }
        await  User.findOneAndUpdate({ "username": input.username }, input);
        return await User.findOne({username: input.username}).populate('cohorte');
    }

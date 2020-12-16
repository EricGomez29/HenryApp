import User from '../../models/Users';
import bcrypt from 'bcrypt';
import { existCohorte } from '../../consultasBD/cohorte';

export const regUser = async (username,firstName, lastName, cohorte,email, password) =>{
    const hash = await bcrypt.hash(password, 9);
    //verifico si existe el cohorte si desde el registro mandan uno
    if (cohorte) {
        cohorte = await existCohorte(cohorte)
    }
    return await User.create( {username, firstName,lastName,cohorte:cohorte,email,password: hash} )
}

export const editUsers = async (input) =>
    {
        console.log(!input.password);
        if(input.password ){
            const hash = await bcrypt.hash(input.password, 9);
            return await  (User.findOneAndUpdate({ "username": input.username }, {...input, password: hash}))
        }
        return await  (User.findOneAndUpdate({ "username": input.username }, input))
    }

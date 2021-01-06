import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';
import bcrypt from 'bcrypt';
import { existCohorte } from '../../consultasBD/cohorte';
import  {addUserCohorte} from '../Cohorte/cohorte'

export const regUser = async (username,firstName, lastName, cohorte,email, password) =>{
    const hash = await bcrypt.hash(password, 9);
    //verifico si existe el cohorte si desde el registro mandan uno
    if(cohorte === 0){
        cohorte = null;
    }
    if (cohorte) {
        cohorte = await existCohorte(cohorte);
        const user = await User.create( {username, firstName,lastName,cohorte:cohorte.number,email,password: hash});
        await Cohorte.findOneAndUpdate({"number": cohorte.number},
        {
            $push : {
                users : user._id 
            }
        });
        return User.findOne({_id: user._id});
    }
    return await User.create( {username, firstName,lastName,cohorte:cohorte,email,password: hash});
}

export const editUsers = async (input) =>{
    if(input.cohorte === 0){
        input.cohorte = null;
    }
    if(input.password ){
        const hash = await bcrypt.hash(input.password, 9);
        input.password= hash;
    }
    if(input.image){
        input.image= input.image.toString();
    }
    if(input.cohorte){
        const cohorte = await existCohorte(input.cohorte);
        if(input.cohorte < cohorte.number){
            throw new Error('No se puede volver a cohortes anteriores')
        }
        input.cohorte = cohorte.number;
    }
    await  User.findOneAndUpdate({ "username": input.username }, input);
    return await User.findOne({username: input.username});
}

export const compareCode = async (codigo, email) =>{
    const user = await  User.findOne({ "email": email });
    if(!user){
        throw new Error(`El email ${email} no existe`);
    }
    if(user.forgotPassword === -1){
        throw new Error(`El email ${email} no ha recibido ningún correo de cambio de contraseña`);
    }
    if((user.forgotPassword - codigo) !== 0){
        throw new Error(`El codigo ingresado es incorrecto`)
    }
    await User.findOneAndUpdate({_id: user._id}, {forgotPassword: -1});
    return User.findOne({_id: user._id});
}
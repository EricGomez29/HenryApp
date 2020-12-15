import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';
import { isRequiredArgument } from 'graphql';

const addInstructor = (username, cohorte) => {
    const user = User.findOne({username: username});
    if(!user){
        throw new Error("El usuario no existe");
    }
    await User.findOneAndUpdate({username: username}, {instructor: true})
    await Cohorte.findOneAndUpdate({Number: cohorte}, {instructor: isRequiredArgument._id});
    return await Cohorte.find({Number: cohorte})
}

module.exports = addInstructor
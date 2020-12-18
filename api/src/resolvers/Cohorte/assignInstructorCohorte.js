import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';

const addCohorteInstructor = async (username, cohorte) => {
    console.log(`${username}  ${cohorte}`)
    const user = User.findOne({username: username});
    if(!user){
        throw new Error("El usuario no existe");
    }
    await User.findOneAndUpdate({username: username}, {isInstructor: true})
    await Cohorte.findOneAndUpdate({Number: cohorte}, {instructor: user._id});
    return await Cohorte.find({Number: cohorte})
}

module.exports = addCohorteInstructor
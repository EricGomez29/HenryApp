import User from '../models/Users'

export const existUser = async(username) => {
    const user = await User.findOne({"username": username});
    if (!user){
        throw new Error (`El Usuario ${username} no existe.`);
    };   
    return user;;
}
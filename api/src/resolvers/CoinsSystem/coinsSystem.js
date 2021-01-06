import User from '../../models/Users';

export const giveCoins = async (username, coins) => {
    console.log(`${username} ${coins}`);
    if (coins <= 0 || coins > 50){
        throw new Error(`La cantidad de monedas no puede ser menor a 0 o mayor a 50`);
    };
    const user = await User.findOne({username: username});
    if (!user){
        throw new Error(`El Usuario ${username} al cual intentas entregarle ${coins} monedas, no existe.`)
    }
    await User.findOneAndUpdate({_id: user._id}, {henryCoins: user.henryCoins + coins})
    return User.findOne({_id: user._id})
}
import Cohorte from '../models/Cohorte'

export const existCohorte = async(cohor) => {
    const numCohorte = await Cohorte.findOne({number: cohor});
    console.log(numCohorte);
    if (numCohorte){
        return numCohorte._id;
    }
    return cohor;
}
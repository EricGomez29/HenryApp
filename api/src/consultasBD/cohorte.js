import Cohorte from '../models/Cohorte'

export const existCohorte = async(cohor) => {
    console.log(cohor)
    const numCohorte = await Cohorte.findOne({number: cohor});
    if (!numCohorte){
       throw new Error(`El Cohorte ${cohor} no existe.`)
    }
    return numCohorte._id;;
}
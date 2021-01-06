import Cohorte from '../models/Cohorte'

export const existCohorte = async(cohor) => {
    const thisCohorte = await Cohorte.findOne({number: cohor});
    if (!thisCohorte){
       throw new Error(`El Cohorte ${cohor} no existe.`)
    }
    return thisCohorte;
};

export const pushCohorte = async(cohor, id) =>{
    return await Cohorte.findOneAndUpdate({"number": cohor},
    {
        $push : {
            users : id 
        }
    });
};

export const pullCohorte = async(cohor, id) =>{
    console.log(`${cohor} ${id}`);
    return await Cohorte.findOneAndUpdate({"number": cohor},
    {
        $pull : {
            users : id
        }
    });
}

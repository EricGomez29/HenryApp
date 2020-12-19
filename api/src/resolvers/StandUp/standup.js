import Cohorte from '../../models/Cohorte'
import StandUp from '../../models/Stand-Up';

export const addStandUp = async ( cohorte ) =>{
   const cohor = await Cohorte.findOne({number: cohorte})
   if(!cohor){
       throw new Error(`El Cohorte ${cohorte} no existe`)
   } 
   const stand = await StandUp.find()
   return await StandUp.create({cohorte: stand.length + 1});
}
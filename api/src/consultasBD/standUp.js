import StandUp from '../models/Stand-Up'

export const pushStandUp = async(stand, id, place) =>{
    return await StandUp.findOneAndUpdate({"name": stand},
    {
        $push : {
            [place] : id 
        }
    }).populate(place);
};

export const pullStandUp = async(stand, id, place) =>{
    return await StandUp.findOneAndUpdate({"name": stand},
    {
        $pull : {
            [place] : id
        }
    }).populate(place);
}

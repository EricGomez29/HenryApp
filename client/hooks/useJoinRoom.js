import { PAIR_PROGRAMMING, STAND_UP } from '../constants/index';
import { ADD_USERMESA } from '../apollo/pairProgramming';
import { useMutation } from '@apollo/client';

const useJoinRoom = ({ type, username }) => {
    return new Promise((resolve, reject => {

        const setMutation = () => {
            if (type === PAIR_PROGRAMMING) {
                return ADD_USERMESA;
            } else {
                //its stand-up here
                return ADD_USERMESA;
            }
        }
        const handleMutation = async (gql) => {
            const [joinRoom] = useMutation(gql);
            const response = await joinRoom({
                variables: {
                    username,
                }
            })
            return {
                data: response.data,
            }
        }
        const gql = setMutation();
        const data = handleMutation(gql);
        resolve(data);
        reject(new Error('No se puedo ingresar a la Sala'));
    }))
}

export default useJoinRoom;
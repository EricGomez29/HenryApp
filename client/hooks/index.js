import { PAIR_PROGRAMMING, STAND_UP } from '../constants/index';
import { ADD_USERMESA } from '../apollo/pairProgramming';
import { useMutation } from '@apollo/client';

export const useJoinRoom = (type) => {

    const setMutation = () => {
        if (type === PAIR_PROGRAMMING) {
            return ADD_USERMESA;
        }
    }
    const handleJoin = async (username) => {
        const response = await joinRoom({
            variables: {
                username,
            }
        });
        return {
            data: response.data,
        }
    }

    const gql = setMutation();
    const [joinRoom] = useMutation(gql);
    return [handleJoin];
}
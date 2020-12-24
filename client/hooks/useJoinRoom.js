import { PAIR_PROGRAMMING, STAND_UP } from '../constants/index';
import { ADD_USERMESA } from '../apollo/pairProgramming';
import { useMutation } from '@apollo/client';

const useJoinRoom = ({ type, user }) => {

    const [joinRoom] = useMutation(setMutation());
    return {

    }
}
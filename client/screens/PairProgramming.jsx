import React from 'react';
import Mesas from '../Components/Mesas';
import { PAIR_PROGRAMMING } from '../constants';

const PairProgramming = ({ navigation }) => {

    const pairProgrammingCohorte3Example = {
        mesas: [
            {
                id: 1,
                linkMeet: "http://meet.com.ar",
                users: [
                    {
                        username: 'Bryan00'
                    }, {
                        username: 'HBL20'
                    }, {
                        username: 'ROlden'
                    }, {
                        username: 'kkl2'
                    }, {
                        username: 'Chingon'
                    }
                ]
            },
            {
                id: 2,
                linkMeet: "http://meet2.com.ar",
                users: [
                    {
                        username: 'Brsadn00'
                    }, {
                        username: 'HBL20'
                    }
                ]
            }, {
                id: 3,
                linkMeet: "http://meet3.com.ar",
                users: [
                    {
                        username: 'Brsdsdn00'
                    }, {
                        username: 'HBL20'
                    }, {
                        userame: 'reiren'
                    }
                ]
            }
        ]
    }

    return (
        <Mesas
            navigation={navigation}
            type={PAIR_PROGRAMMING}
            mesas={pairProgrammingCohorte3Example.mesas}
        />
    );
}

export default PairProgramming;
import React from 'react';
import Mesas from '../Components/Mesas';
import { STAND_UP } from '../constants/index';

const StandUp = ({ navigation, me }) => {

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
                ],
                leads: [
                    {
                        id: 123,
                        username: 'FIlds',
                        firstName: 'Bryan',
                        lastName: 'Plata',
                    }, {
                        id: 124,
                        username: 'Golds',
                        firstName: 'GOnzales',
                        lastName: 'Roris'
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
                ],
                leads: [
                    {
                        id: 120,
                        username: 'FIlds',
                        firstName: 'Bryan',
                        lastName: 'Plata',
                    }, {
                        id: 121,
                        username: 'Golds',
                        firstName: 'GOnzales',
                        lastName: 'Roris'
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
                ],
                leads: [
                    {
                        id: 4,
                        username: 'FIlds',
                        firstName: 'Bryan',
                        lastName: 'Plata',
                    }, {
                        id: 5,
                        username: 'Golds',
                        firstName: 'GOnzales',
                        lastName: 'Roris'
                    }
                ]
            }
        ]
    }
    return (
        <Mesas
            navigation={navigation}
            type={STAND_UP}
            mesas={pairProgrammingCohorte3Example.mesas}
        />
    );
}

export default StandUp;
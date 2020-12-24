import React from 'react';
import Mesas from '../Components/Mesas';
import { STAND_UP } from '../constants/index';

const StandUp = ({ navigation, me }) => {

    const StandUPCohorte3Example = {
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
                        username: 'reiren'
                    }
                ]
            }
        ]
    }
    return (
        <Mesas
            type={STAND_UP}
            users={StandUPCohorte3Example.mesas}
        />
    );
}

export default StandUp;
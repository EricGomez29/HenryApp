import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import TarjetaUSer from '../Components/TarjetaUser'

const GET_USER = gql`
query Users{
    users{
        isAdmin
        isPM
        username
    }
}`

export default function RolesList() {
    const {loading, data, error, refetch} = useQuery(GET_USER)
    const [users, setUsers] = useState(false);
    const [usersPM, setUsersPM] = useState();
    const [usersAdmin, setUsersAdmin] = useState();
    const usersMap = () => {
        let usuariosPM = []
        let usuariosAdmin = []
        data?.users?.map((u, i) => {
            if(u.isPM && u.isAdmin){
                usuariosPM.push(u)
                usuariosAdmin.push(u)
            } else if(u.isPM) {
                usuariosPM.push(u)
            } else if(u.isAdmin) {
                usuariosAdmin.push(u)
            }
        })
        setUsers(true)
        setUsersPM(usuariosPM)
        setUsersAdmin(usuariosAdmin)
    }

    useEffect(() => {
        refetch()
        usersMap()
    })

    return (
        <View>
           
            <Text>PMs: </Text>
            <TarjetaUSer users={usersPM}/>
            {/* {
                users && usersPM.map((u, i) => {
                    return (<Text key={i}>{u.username}</Text>)
                })
            } */}
            <hr/>
            <Text>Admins: </Text>
            <TarjetaUSer users={usersAdmin}/>
            {/* {
                users && usersAdmin.map((u, i) => {
                    return (<Text key={i}>{u.username}</Text>)
                })
            } */}
        </View>
    )
}
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';

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
        data && data?.users.map((u, i) => {
            if(u.isPM === "true" && u.isAdmin === "true"){
                usuariosPM.push(u)
                usuariosAdmin.push(u)
            } else if(u.isPM === "true") {
                usuariosPM.push(u)
            } else if(u.isAdmin === "true") {
                usuariosAdmin.push(u)
            }
        })
        refetch()
        setUsers(true)
        setUsersPM(usuariosPM)
        console.log(usersPM)
        setUsersAdmin(usuariosAdmin)
        console.log(usersAdmin)
    }

    useEffect(() => {
        refetch()
        usersMap()
    }, [data && data?.users])

    useEffect(() => {
        refetch()
    })

    return (
        <View>
            <Text style={{ fontSize: 80, textAlign: "center"}}>
                Hola Mundo
            </Text>
            <Text>PMs: </Text>
            {
                users && usersPM.map((u, i) => {
                    return (<Text key={i}>{u.username}</Text>)
                })
            }
            <hr/>
            <Text>Admins: </Text>
            {
                users && usersAdmin.map((u, i) => {
                    return (<Text key={i}>{u.username}</Text>)
                })
            }
        </View>
    )
}
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { styles } from '../styles/StudentsListStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { gql, useQuery, useMutation } from '@apollo/client';
import { RemoveUserCohorte } from '../apollo/admin';
import { ListItem, Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import MenuDesplegable from './MenuDesplegable';
import CreateUserCohorte from './CreateUserCohorte';
import Particles from './Particles';

const GET_COHORTES = gql`
query cohortes($number: Int){
    cohortes(where: {number: $number}){
        users {
            username
            firstName
            lastName
            cohorte
            image
        }
    }
}`;

const GET_ALL_COHORTES = gql`
query cohortes{
    cohortes{
        number
    }
}`

const GET_USER = gql`
query users($firstName: String){
    users(where: {firstName: $firstName}){
        username
        firstName
        lastName
        cohorte
        image
    }
}`

const GET_ALL_USERS = gql`
query users{
    users{
        username
        firstName
        lastName
    }
}`

export default function StudentsList({ navigation }) {
    const [num, setNum] = useState()
    const [show, setShow] = useState(false)
    const [toggle, setToggle] = useState(false);
    const [name, setName] = useState('empty')
    const [find, setFind] = useState('empty')
    const value = parseInt(num)

    const { loading, data, error, refetch } = useQuery(GET_COHORTES, {
        variables: {
            number: value
        }
    })
    const { loading: loading3, data: data3, error: error3 } = useQuery(GET_USER, {
        variables: {
            firstName: find
        }
    })
    const { loading: loading2, data: data2, error: error2 } = useQuery(GET_ALL_COHORTES);
    const { loading: loading4, data: data4, error: error4 } = useQuery(GET_ALL_USERS);
    const [removeUser] = useMutation(RemoveUserCohorte);

    const labels = []
    data2 && data2?.cohortes.map(c => {
        return labels.push({ label: c.number.toString(), value: c.number.toString() })
    })

    function onSearchUser() {
        setFind(name)
        setShow(false)
    }

    const handleDeleteUser = async username => {
        await removeUser({
            variables: {
                username,
            }
        })
        refetch();
    }

    const handleOnClose = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        onSearchUser()
    }, [data3])

    function listUsers() {
        return (
            <View style={{ width: "80%", alignSelf: "center" }}>
                {
                    show && data && data?.cohortes[0]?.users.map((u, i) => {
                        return (
                            <ListItem key={u.username} onPress={() => navigation.navigate('ProfileUser', { modifyData: u })}>
                                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={u.image || "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"} style={{ width: 40, height: 40 }} />
                                        <ListItem.Content>
                                            <View style={{ display: "flex", width: "100%", flexDirection: "row" }}>
                                                <ListItem.Title>{u.firstName} {''}</ListItem.Title>
                                                <ListItem.Title>{u.lastName}</ListItem.Title>
                                            </View>
                                        </ListItem.Content>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{ backgroundColor: '#e53935', padding: '10px', borderRadius: '5px' }} onPress={() => handleDeleteUser(u.username)}>
                                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ListItem>
                        )
                    })
                }
            </View>
        )
    }

    function findUser() {
        const results = data4?.users
        if (show) {
            return <View></View>
        } else {
            return (
                <View style={{ width: "80%", alignSelf: "center" }}>
                    {
                        data4 && data4?.users.map((u, i) => {
                            var nameMin = u.firstName.toLowerCase()
                            var nameSearch = name.toLocaleLowerCase()
                            if (nameMin === nameSearch) {
                                return (
                                    <ListItem key={u.username}>
                                        <Image source={u.image || "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"} style={{ width: 40, height: 40 }} />
                                        <ListItem.Content>
                                            <View style={{ display: "flex", width: "100%", flexDirection: "row" }}>
                                                <ListItem.Title>{u.firstName} {''}</ListItem.Title>
                                                <ListItem.Title>{u.lastName}</ListItem.Title>
                                            </View>
                                            <ListItem.Subtitle>{u.username}</ListItem.Subtitle>
                                            <ListItem.Subtitle>Cohorte: {u.cohorte}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                )
                            }
                        })
                    }
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            {toggle && <CreateUserCohorte onClose={handleOnClose} />}
            <View style={{ width: '100%', height: '99%', position: 'absolute', zIndex: -1 }}>
                <Particles />
            </View>
            <View style={{ alignItems: "flex-start", width: "100%" }}>
                <MenuDesplegable navigation={navigation} />
            </View>
            <View style={styles.line}>
                <Text style={styles.title}>
                    Alumnos
                </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center' }}>
                <View>
                    <TouchableOpacity style={{ backgroundColor: '#F2FF00', padding: '10px', borderRadius: '5px' }} onPress={() => setToggle(!toggle)}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: '14px' }}>Nuevo Alumno</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dropDrown}>
                    <Text style={{ fontSize: 15 }}>
                        Cohorte: Nº<DropDownPicker
                            items={labels}
                            placeholder='Seleccionar'
                            defaultValue={num}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => {
                                setShow(true)
                                return setNum(item.value)
                            }}
                        />
                    </Text>
                </View>
            </View>

            <View style={styles.containerInput}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Buscar usuario..."
                    onChangeText={(e) => setName(e)}
                />
                <TouchableOpacity onPress={onSearchUser} style={{ paddingHorizontal: 10 }}>
                    <Icon
                        name="search"
                        type="font-awesome-5"
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "#fff9", width: "90%", padding: 20 }}>
                {listUsers()}
                {findUser()}
            </View>
        </View>
    )
};
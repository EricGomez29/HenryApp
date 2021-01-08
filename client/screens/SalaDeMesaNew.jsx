import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TextInput, Image } from 'react-native';
import {GET_MESA, REMOVE_MESA, ADD_LINK} from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';
import * as WebBrowser from 'expo-web-browser';
import {styles} from '../styles/SalaMesaStyle';
import { ListItem, Icon } from 'react-native-elements';
import Particles from './Particles';
import moment from 'moment'

export default function SalaDeMesaNew({navigation}) {
    //OBTENER LINK Y USUARIOS
    const idMesa = localStorage.getItem('idMesa');
    const userName = localStorage.getItem('userName');
    const fecha = moment().format('DD/MM/YYYY')
    const { loading, data, error, refetch } = useQuery(GET_MESA, {
        variables: {
            id: idMesa,
        }
    })
    //STATES
    const [value, setValue] = useState()
    const [users, setUsers] = useState([])
    const [cacheLink, setCacheLink] = useState('')
    //GUARDAR LINK
    var actualLink = data?.pairProgramming[0].linkMeet
    localStorage.setItem('linkMeetLocal', data?.pairProgramming[0].linkMeet)
    const defectLink = "meet.google.com/new"
    //LINKEAR UNA REUNION
    const [addLink] =useMutation(ADD_LINK)
    const handleLink = async () => {
        if(!value){
            return alert('Por favor pegue un link válido')
        }
        await addLink({
            variables: {
                id: idMesa,
                link: value
            }
        })
    }
    //SALIR DE LA MESA
    const [removeMesa] = useMutation(REMOVE_MESA);
    const handleSubmit = async () => {
        await removeMesa({
            variables: {
                username: userName,
                dia: fecha
            }
        })
        localStorage.removeItem('idMesa')
        navigation.navigate('Welcome');
    }
    //GENERAR LINK
    function handlePress (){  
        WebBrowser.openBrowserAsync('http://meet.google.com/new');
    }
    //FIJAR LINK
    function handlePress2 (){
        if(!actualLink) {
            actualLink = localStorage.getItem('linkMeetLocal')
        }
        WebBrowser.openBrowserAsync(actualLink);
    }

    //MAPEO DE LOS USUARIOS
    function mapUsers () {
        let usuarios = [];
        if(data?.pairProgramming[0] === undefined) {
            users.map((u, i) => {
                usuarios.push(u)
            })
        }
        data?.pairProgramming[0].users.map((u, i) => {
            usuarios.push(u)
        })
        refetch()
        setUsers(usuarios)
    }
    
    //PARA OBTENER LOS DATOS ACTUALIZADOS DE LA API
    useEffect(() => {
        // refetch()
        mapUsers()
    }, [data && data?.pairProgramming[0].users.length])

    useEffect(() => {
        refetch()
    })

    return (
        <View style={styles.todo}>
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>

            <View>
                <View style={{borderBottomColor: "yellow", borderWidth: 10}}>
                    <Text style={{color: "white", fontSize: 50, fontWeight: "bold"}}>
                        Pair Programming
                    </Text>
                </View>
            </View>

            {/* LINK */}
            <View style={{ backgroundColor: "#fff9", width: "90%", padding: 20, alignItems: "center" }}>
                <View style={{ width: "80%", alignSelf: "center", backgroundColor: "white" }}>
                    <View style={styles.btnLink2} sx={{width: [200, 250], height: [35, 40], marginTop: 30}} >
                        <TouchableOpacity onPress={handlePress} >
                            <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>Generar Link</Text>
                        </TouchableOpacity>
                    </View> 
                    <View style={{marginVertical: 10, width: "80%", alignSelf: "center"}}>
                        <Text style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}> 
                            <TextInput style={{width: "100%", padding: 10, textAlign: "center"}} placeholder="Pegue el link aqui" onChangeText={(e) => setValue(e)}/>
                            <TouchableOpacity onPress={handleLink}>
                                <Icon raised type="font-awesome-5" name="thumbtack" size={20}></Icon>
                            </TouchableOpacity>
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handlePress2}>
                            <Text style={styles.btnLink}>
                                {actualLink && <Text>Entrar Al Pair Programming</Text>}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <hr/>
            {/* USUARIOS */}
            <View>
                <Text style={{fontWeight: "bold", fontSize: 30, color: "white", marginBottom: 10}}>Henrys en mesa:</Text>
            </View>
            <View style={{ backgroundColor: "#fff9", width: "90%", padding: 20, marginBottom: 20 }}>
                <View style={{ width: "80%", alignSelf: "center" }}>
                    {
                        users && users.map((u, i) => {
                            return (
                                <ListItem key={i} bottomDivider onPress={() => navigation.navigate('ProfileUser', { data: u })}>
                                    <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={u.image || "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"} style={{ width: 40, height: 40 }} />
                                        <ListItem.Content>
                                            <View style={{ display: "flex", width: "100%", flexDirection: "row", paddingLeft: 15 }}>
                                                <ListItem.Title>{u.firstName} {''}</ListItem.Title>
                                                <ListItem.Title>{u.lastName}</ListItem.Title>
                                            </View>
                                            <View style={{paddingLeft: 20}}>
                                                <ListItem.Subtitle>{u.username}</ListItem.Subtitle>
                                            </View>
                                        </ListItem.Content>
                                    </View>
                                </ListItem>
                            )
                        })
                    }
                    <View style={styles.containerBoton}>
                        <View sx={{width: [130, 200], height: [40, 50]}} style={styles.botonSalir}>
                            <TouchableOpacity onPress={handleSubmit} >
                                <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 18, marginTop: 5, paddingBottom: 5}}>Salir</Text>
                            </TouchableOpacity>
                        </View>
                        <View sx={{width: [130, 200], height: [40, 50]}} style={styles.botonSalir}>
                            <TouchableOpacity  onPress={() => navigation.navigate('Welcome')}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 18, marginTop: 5, paddingBottom: 5 }}>Inicio</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
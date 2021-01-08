import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {Text} from 'dripsy'
import Mesas from '../Components/Mesas';
import Particles from './Particles';
import {styless} from '../styles/StandUpStyles';
import { useMutation, useQuery, gql } from '@apollo/client';
import {GET_USER} from '../apollo/user';
import {GET_GRUPO, ADD_LINK} from '../apollo/standUp';
import Menu from './MenuDesplegable';
import TarjetaUser from '../Components/TarjetaUser';
import {styles} from '../styles/SalaMesaStyle';
import { ListItem, Icon } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';

export default function StandUp({navigation}){
    const email = localStorage.getItem('userEmail')
    const { loading, data, error } = useQuery(GET_USER, {
        variables: {
            email,
        }
    })
    const [newData, setNewData] = useState()
    var nombreGrupo;
    if(data?.users[0]?.listPM) {
        nombreGrupo = data?.users[0]?.listPM
    }
    var nombreGrupo;
    if(data?.users[0]?.standUp) {
        nombreGrupo = data?.users[0]?.standUp
    }
    const {loading: loading2, data: data2, error: error2, refetch } = useQuery(GET_GRUPO, {
        variables: {
            name: nombreGrupo.toString()
        }
    })
    const idStand = localStorage.setItem('idStand', data2?.standup[0]?._id)

    //FIJAR LINK
    const [value, setValue] = useState()
    const [addLink] = useMutation(ADD_LINK)
    const handleLink = async () => {
        const id = localStorage.getItem('idStand')
        const userName = localStorage.getItem('userName')
        if(!value){
            return alert('Por favor pegue un link válido')
        }
        await addLink({
            variables: {
                id: id,
                link: value,
                username: userName
            }
        })
    }
    
    //GENERAR LINK
    function handlePress (){  
        WebBrowser.openBrowserAsync('http://meet.google.com/new');
    }
    var actualLink = data2?.standup[0]?.linkMeet
    localStorage.setItem('linkMeetStand', data2?.standup[0]?.linkMeet)
    function handlePress2 (){
        if(!actualLink) {
            actualLink = localStorage.getItem('linkMeetStand')
        }
        WebBrowser.openBrowserAsync(actualLink);
    }

    useEffect(() => {
        refetch()
    })
    const links = () => {
        if(data?.users[0]?.isPM){
            return (
                <View style={{ backgroundColor: "#fff9", width: "90%", padding: 20, alignItems: "center", alignSelf: "center" }}>
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
                                    {actualLink && <Text>Entrar Al StandUp</Text>}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{alignSelf: "center"}}>
                    <TouchableOpacity onPress={handlePress2}>
                        <Text style={styles.btnLink}>
                            {actualLink && <Text>Entrar Al StandUp</Text>}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const usuarios = data2?.standup[0]?.users
    const pms = data2?.standup[0]?.PM

    return (
        <View style={styless.todo}>
            <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>
            <View style={{zIndex: 5}}>
                <Menu navigation={navigation} />
            </View>
            {links()}
            <View style={{alignSelf: 'center'}}>
                <Text style={styless.title} sx={{fontSize: [25, 30]}}>Grupo:  {nombreGrupo}</Text>
                <View style={styless.recuadro}>
                    <View style={{width:'80%', backgroundColor: '#ffff6d', marginTop: 20}}>
                        <Text style={{fontSize: 27}}>PM's:</Text>
                    </View>
                    <TarjetaUser users={pms} />
                    <View style={{width:'80%', backgroundColor: '#ffff6d', marginTop: 20}}>
                        <Text style={{fontSize: 27}}>Alumnos:</Text>
                    </View>
                    <TarjetaUser users={usuarios} />
                </View>       
            </View>
        </View>
    )
}
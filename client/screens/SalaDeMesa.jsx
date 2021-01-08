import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity } from 'react-native';
import { View, Text, TextInput } from 'dripsy';
import {styles} from '../styles/SalaMesaStyle';
import TarjetaUser from '../Components/TarjetaUser';
import {GET_MESA, REMOVE_MESA, ADD_LINK} from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import {ListItem, Avatar} from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import {Icon} from 'react-native-elements';
import Particles from './Particles';
import icon from '../assets/logoHenry.png';

export default function SalaDeMesa({ navigation }){
    const hora = moment().format
    const fecha = moment().format('DD/MM/YYYY')
    const [value, setValue] = useState()
    const userName = localStorage.getItem('userName')
    const idMesa = localStorage.getItem('idMesa');
    const { loading, data, error, refetch } = useQuery(GET_MESA, {
        variables: {
            id: idMesa,
        }
    })
    const linkMeet = data && data?.pairProgramming[0].linkMeet
    const [link, setLink] = useState(linkMeet)
    const [usuarios, setUsuarios]= useState(data?.pairProgramming[0].users);

    function handlePress (){  
        WebBrowser.openBrowserAsync('http://meet.google.com/new');
    }
    function handlePress2 (){
        WebBrowser.openBrowserAsync(link);
    }
   
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
    const [addLink] =useMutation(ADD_LINK)
    const handleLink = async () => {
        setLink(value)
        await addLink({
            variables: {
                id: idMesa,
                link: value
            }
        })
    }

    const linkk = () => {
        if(link === false){
            return (<Text style={{color: '#6200ee'}}>  {linkMeet}</Text>)
        }
        else return (<Text style={{color: '#6200ee'}}>  {link}</Text>)
    }
    
    function onRefresh() {
        let newLink = data?.pairProgramming[0].linkMeet;
        let newUsers = data?.pairProgramming[0].users
        setLink(newLink)
        setUsuarios(newUsers)
        refetch()
    }

    useEffect(() => {
        refetch()
        onRefresh()
    }, [data?.pairProgramming[0].users.length])

    useEffect(() => {
        refetch()
        onRefresh()
        setLink(data?.pairProgramming[0].linkMeet)
    }, [data?.pairProgramming[0].linkMeet])

    useEffect(() => {
        refetch()
    })
    
    return (
        <View style={styles.todo}>
            
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>
            <View style={{alignItems: "center"}}>  
                <View style={styles.botonLink} sx={{width: [200, 250], height: [35, 40], marginTop: 30}} >
                    <TouchableOpacity onPress={handlePress} >
                        <Text sx={{fontSize: [20,25], color: 'black', fontWeight: 'bold'}}>Generar Link</Text>
                    </TouchableOpacity>
                </View> 

                <Text style={{marginTop: 10, display: 'flex'}}> 
                    <TextInput style={styles.input} placeholder="Pegue el link aqui" sx={{width: [200, 250], height: [40, 50]}} onChangeText={(e) => setValue(e)}/>
                    <TouchableOpacity onPress={handleLink} style={styles.fijar}><Icon raised type="font-awesome-5" name="thumbtack" size={15}></Icon></TouchableOpacity>
                </Text>
                
                <View style={styles.linkFijado}>
                    <Text style={styles.link} sx={{fontSize:[20, 30], display:'flex'}}> Link de la reunion   
                        <TouchableOpacity onPress={onRefresh} >
                            <Text sx={{fontSize:[15, 27], paddingLeft: 10}}>
                                ↺
                            </Text>
                        </TouchableOpacity>
                    </Text>
                    <TouchableOpacity onPress={handlePress2} >
                        <Text sx={{fontSize:[18, 30]}}>
                            {link && link}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                {/* <TarjetaUser users= {usuarios && usuarios}/> */}
                <View style={styles.container}>
                    {
                        usuarios && usuarios.map((l, i) => {
                            return (
                                <ListItem key={i} bottomDivider>
                                    <Image source={l.image || icon} style={{width: 60, height: 60, borderRadius: 100}}/>
                                    <ListItem.Content style={styles.content}>
                                        <ListItem.Title style={{fontSize: 20}}>{l.firstName}</ListItem.Title>
                                        <ListItem.Subtitle>{l.lastName}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        })
                    }
                </View>
                <View style={styles.containerBoton}>
                    <View sx={{width: [130, 200], height: [40, 50]}} style={styles.botonSalir}  >
                        <TouchableOpacity onPress={handleSubmit} >
                            <Text sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: [15, 18]}}>Salir</Text>
                        </TouchableOpacity>
                    </View>
                    <View sx={{width: [130, 200], height: [40, 50]}} style={styles.botonSalir}>
                        <TouchableOpacity  onPress={() => navigation.navigate('Welcome')}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize:  [15, 18] }}>Inicio</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
import React, {useState} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {View} from 'dripsy'
import {AdminList} from './Admin';
import {styles} from '../styles/AddUSerStandStyles';
import {ADD_USERSTAND, GET_COHORTES, GET_GRUPOSTAND } from '../apollo/standUp';
import {GET_USERCOHORTES } from '../apollo/user';
import { useMutation, useQuery} from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
import {ListItem, Avatar, CheckBox} from 'react-native-elements';
import logo from '../assets/logoHenry.png';


export default function AddUserStand({navigation}){
    const {data, error, loading} = useQuery(GET_COHORTES)    //primero: llama a la query
    console.log(data) 
    const numCohorte = data?.cohortes;                      //segundo: guarda la data en una constante
    const [cohorte, setCohorte] = useState()                //cuarto: en este estado guarda el value del DropDown
    const numNuevo= parseInt(cohorte)                       // parsea el numero de cohorte xq se guarda como string
    const numero = []
    numCohorte && numCohorte.map(n => {                      //tercero: mapea la constante y lo guarda en el array de arriba
        numero.push({label: n.number.toString(), value: n.number.toString()})
    })
    const {data: data2, error: error2, loading: loading2} = useQuery(GET_GRUPOSTAND, {  //para ver los grupos de cada cohorte
        variables: {
            cohorte: numNuevo,
        }
    })
    const[nuevaData, setNuevaData] = useState ()
    const newData = data2?.standup
    const array = [];
    newData && newData.map(n => {                      //mapea la constante newData y lo guarda en el array de arriba
        array.push({label: n.name, value: n.name})
    })
    
    const {loading: loading3, data: data3, error: erorr3} = useQuery(GET_USERCOHORTES, {
        variables: {
            number: numNuevo
        }
    })

    function Cohorte(){
        if(cohorte){
            return (
                <Text>Cohorte: {cohorte}</Text>
            )
        }
    }

    function Nombres(){
        if(nuevaData && nuevaData[7] === cohorte){
            return (
                <Text>Grupo: {nuevaData}</Text>
            )
        }
    }

    const [addUserStand] = useMutation(ADD_USERSTAND)

    const handleSubmit = async (e) => {
        const response = await addUserStand({
            variables: {
                username: e,
                name: nuevaData

            }
        })
        console.log(response.data)
    }



    function listUsers() {
        return (
            <View style={{width: 300, alignSelf: "center"}}>
                {
                    data3 && data3?.cohortes[0]?.users.map((u, i) => {
                        return (
                            <ListItem key={u.username}>
                                <Image source={u.image || logo} style={{width:40, height:40}}/>
                                <ListItem.Content>
                                    <View style={{display: "flex", width:"100%", flexDirection: "row"}}>
                                        <ListItem.Title>{u.firstName} {''}</ListItem.Title>
                                        <ListItem.Title>{u.lastName}</ListItem.Title>
                                    </View>
                                <ListItem.Subtitle>{u.username}</ListItem.Subtitle>
                                <ListItem.Subtitle>Cohorte: {u.cohorte}</ListItem.Subtitle>
                                </ListItem.Content>
                                <TouchableOpacity onPress={ () => handleSubmit(u.username)}>
                                    <Text>Agregar</Text>
                                </TouchableOpacity>
                            </ListItem>
                        )
                    })
                }
            </View>
        )
    }

    return(
        <View style={{height: '100%', backgroundColor: 'white'}} >
            <View style={{width: '100%', height: 500, position: 'absolute'}}>
                <Image
                    source={require("../assets/FondoAmarillo2.png")}
                    style={{width: '100%', position: 'absolute', height: 500}}
                ></Image>
            </View>
            <View sx={{position: 'absolute', width: [0, 0, 300], opacity: [0, 0, 100], zIndex: [-1, -1, 1]}}>
                <AdminList/>
            </View>
            <View style={styles.container} sx={{marginLeft: [0, 20]}}>
                <Text>Hola</Text>
                <View style={styles.cuadro}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <DropDownPicker
                            items={numero}
                            placeholder= 'Elegi el cohorte'
                            defaultValue={cohorte}
                            
                            containerStyle={{height: 40, width: 150}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setCohorte(item.value)}
                        />
                        <DropDownPicker
                            items={array}
                            placeholder= 'Elegi el grupo'
                            defaultValue={nuevaData}
                            containerStyle={{height: 40, width: 150}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setNuevaData(item.value)}
                        />
                        
                    </View>
                </View>
                {Cohorte()}
                {Nombres()}
                {listUsers()}
                <View>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text>Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}
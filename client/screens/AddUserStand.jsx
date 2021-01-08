import React, {useState, useEffect} from 'react';
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
import Particles from './Particles'
import MenuDesplegable from './MenuDesplegable';

export default function AddUserStand({navigation}){
    const {data, error, loading} = useQuery(GET_COHORTES)    //primero: llama a la query
    const numCohorte = data?.cohortes;                      //segundo: guarda la data en una constante
    const [cohorte, setCohorte] = useState()                //cuarto: en este estado guarda el value del DropDown
    const numNuevo= parseInt(cohorte)                       // parsea el numero de cohorte xq se guarda como string
    const numero = []
    numCohorte && numCohorte.map(n => {                      //tercero: mapea la constante y lo guarda en el array de arriba
        numero.push({label: `Cohorte ${n.number.toString()}`, value: n.number.toString()})
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
    
    const {loading: loading3, data: data3, error: erorr3, refetch} = useQuery(GET_USERCOHORTES, {
        variables: {
            number: numNuevo
        }
    })

    function Cohorte(){
        if(cohorte){
            return (
                <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Cohorte: {cohorte}</Text>
            )
        }
    }

    function Nombres(){
        if(nuevaData && nuevaData[7] === cohorte){
            return (
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Grupo: {nuevaData}</Text>
            )
        }
    }
    const [agregado, setAgregado] = useState(false)
    const [addUserStand] = useMutation(ADD_USERSTAND)
    const handleSubmit = async (e) => {
        try{
        const response = await addUserStand({
            variables: {
                username: e,
                name: nuevaData

            }
        })
        onRefresh()
    }catch (e){
        setErr(true)
    }
        
    }

    function onRefresh() {
        refetch()
        let agregar = data3?.cohortes[0]?.users
        setAgregado(agregar)
    }

    useEffect(() => {
        refetch()
        onRefresh()
    }, [data3?.cohortes[0]?.users])

    const[err, setErr] = useState(false)
    function Error(){
        if(err){
            return (
            <Text style={{color: 'red', fontSize: 18,fontWeight: 'bold', backgroundColor: 'white', marginVertical: 5}}>
                No se ha elegido un grupo.
            </Text>)
        }
    }

    function listUsers() {
        return (
            <View style={{marginBottom: 20, width: 350, zIndex: 8}} >
                {
                    data3 && data3?.cohortes[0]?.users.map((u, i) => {
                        if(!u.standUp){
                            return (
                                <ListItem key={u.username} bottomDivider>
                                    <Image source={u.image || logo} style={{width:40, height:40}}/>
                                    <ListItem.Content>
                                        <View style={{display: "flex", width:"100%", flexDirection: "row"}}>
                                            <ListItem.Title>{u.firstName} {''}</ListItem.Title>
                                            <ListItem.Title>{u.lastName}</ListItem.Title>
                                        </View>
                                    <ListItem.Subtitle>{u.username}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Cohorte: {u.cohorte}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <TouchableOpacity onPress={ () => handleSubmit(u.username)} style={styles.botoncito}>
                                        <Text style={{color: 'green'}}>Agregar</Text>
                                    </TouchableOpacity>
                                </ListItem>    
                            )
                        }
                    })
                }
            </View>
        )
    }


    return(
        <View style={{height: '100%', backgroundColor: 'black'}} >
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>
            <View style={{width: '100%', alignItems:'flex-start'}}>
                <MenuDesplegable navigation={navigation}/>
            </View>
            <View style={styles.container}>
                    <Text style={styles.titulo}>Asignar usuarios a un grupo</Text>
                <View style={styles.cuadroTransparent} >
                    <View style={styles.cuadro}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>Elige Cohorte y Grupo:</Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 10}}>
                            <DropDownPicker
                                items={numero}
                                placeholder= 'Cohorte Nº:'
                                defaultValue={cohorte}
                                
                                containerStyle={{height: 40, width: 120}}
                                style={{backgroundColor: 'black', zIndex: 10}}
                                labelStyle={{color: 'white'}}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                    color: 'white'
                                }}
                                dropDownStyle={{backgroundColor: 'black'}}
                                onChangeItem={item => {
                                    setErr(false)
                                    return setCohorte(item.value)
                                }}
                            />
                            <DropDownPicker
                                items={array}
                                placeholder= 'Elegi el grupo'
                                defaultValue={nuevaData}
                                containerStyle={{height: 40, width: 150, margin: 5}}
                                style={{backgroundColor: 'black', zIndex: 10}}
                                labelStyle={{color: 'white'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: 'black'}}
                                onChangeItem={item => {
                                    setErr(false)
                                    return setNuevaData(item.value)
                                }}
                            />
                        </View>
                    </View>
                    {Cohorte()}
                    {Nombres()}
                    {Error()}
                    {listUsers()}
                </View>
            </View>
        </View>

    )
}
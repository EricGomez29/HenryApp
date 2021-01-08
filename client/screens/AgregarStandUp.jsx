import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import {View} from 'dripsy';
import {ADD_GRUPOSTAND, GET_COHORTES, GET_GRUPOSTAND } from '../apollo/standUp';
import {useMutation, useQuery} from '@apollo/client';
import {styles} from '../styles/AgregarStandStyles';
import {AdminList} from './Admin';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import Particles from './Particles'
import { ListItem, Avatar } from 'react-native-elements';
import MenuDesplegable from './MenuDesplegable';

export default function AgregarStand ({navigation}){
    const [num, setNum] = useState()
    const [aparece, setAparece] = useState(false)
    const [change, setChange] = useState(false)
    const numNuevo= parseInt(num)
    const {data, error, loading} = useQuery(GET_COHORTES)
    const {data: data2, error: error2, loading: loading2, refetch} = useQuery(GET_GRUPOSTAND, {
        variables: {
            cohorte: numNuevo,
        }
    })
    const[nombre, setNombre] = useState()
    const numCohorte = data?.cohortes
    const numero = []
    numCohorte && numCohorte.map(n => {
        numero.push({label: `Cohorte ${n.number.toString()}`, value: n.number.toString()})
    })
    const [addStand] = useMutation(ADD_GRUPOSTAND);

    const handleSubmit = async () => {
        const response = await addStand({
            variables: {
                cohorte: numNuevo,
            }
        })
        setNombre(response.data.addStandUp.name)
        setChange(true)
    }
    
    function onRefresh() {
        refetch()
        let newData = data2?.standup
        setAparece(newData)
    }

    useEffect(() => {
        refetch()
        onRefresh()
    }, [data2?.standup])


    function  grupos() {
        const numerito = () =>{
            if(num !== "NaN"){
                return num
            }
            var n = 'Nº'
            return n;
        }

        const nuevo = () =>{
            if(change){
                return(<Text style={styles.nombres}>{nombre}<Text style={{color: 'red'}}>  Nuevo!</Text></Text>)
            }
        }
        
        return (
            <View style={styles.gruposStand}>
                 <ListItem  bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Grupos del cohorte: {num}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                {
                    aparece && aparece.map((n, i) => {
                        return (
                            <ListItem key={i} bottomDivider>
                                <ListItem.Chevron />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.nombres}>{n.name}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        )
                    })
                }
                <ListItem bottomDivider>
                <ListItem.Chevron />
                    <ListItem.Content>
                        <ListItem.Title>{nuevo()}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }
    

    return (
        <View style={{height: "100%", backgroundColor: "black"}}>
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>
            <View style={{width: '100%', alignItems:'flex-start'}}>
                <MenuDesplegable navigation={navigation}/>
            </View>
            {/* <View sx={{position: 'absolute', width: [0, 0, 300], opacity: [0, 0, 100], zIndex: [-1, -1, 6]}}>
                <AdminList navigation={navigation}/>
            </View> */}

            <View style={styles.container} sx={{marginLeft: [0, 20]}}>
                <View style={styles.recuadro} sx={{width: [350, 400]}}>
                    <Text style={styles.title2}>Agregar grupo de Stand Up</Text>
                    <View style={styles.cuadro}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <DropDownPicker
                                items={numero}
                                placeholder= 'Elegi el cohorte'
                                defaultValue={num}
                                containerStyle={{height: 40, width: 150}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => {
                                    onRefresh()
                                    setChange(false)
                                    return setNum(item.value)
                                }}
                            />
                            
                            <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                <Text style={{fontSize: 18, color: 'red'}}>Agregar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.grupos}>
                        
                        {grupos()}
                    </View>
                </View>
            </View>
        </View>
    )
}
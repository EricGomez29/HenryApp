import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, Image} from 'react-native';
import {View, Text} from 'dripsy'
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { GET_MESAS } from '../Querys/userQuery';
import { useQuery } from '@apollo/client';
import {styles} from '../styles/MesaStyle';

export function Mesa({navigation, users}){
    const [personas, setPersonas] = useState(users.length)

    function SumarPersonas(){
        setPersonas(personas + 1)
        // navigation.navigate('#')
    }

    const mesaLlena = () =>{
        if(personas === 5){
            return (
                <View style={{flex: 1, margin: 20}} >
                <View style={styles.container}>
                    <View style={styles.cuadroDisabled} sx={{width: [300, 500]}}>
                        <View >
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mesa Nº: 1</Text>
                        </View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop:10}}>Alumnos: {personas}/5</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>Mesa Llena!</Text>
                        <TouchableOpacity style={styles.botonDisabled} onPress={SumarPersonas} disabled={personas === 5}>
                            <Text style={{fontWeight: 'bold'}}>Unirse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            )
        }
        else return (
            <View style={{flex: 1, margin: 20}} >
                <View style={styles.container}>
                    <View style={styles.cuadro} sx={{width: [300, 500]}}>
                        <View >
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mesa Nº: 1</Text>
                        </View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop:10}}>Alumnos: {personas}/5</Text>
                        <TouchableOpacity style={styles.botonMesa} onPress={SumarPersonas} disabled={personas === 5}>
                            <Text style={{fontWeight: 'bold'}}>Unirse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
        
    }

    return (
        <View>
            {mesaLlena()}
        </View>
    )
}


export function Mesas(){
    const { loading, data, error } = useQuery(GET_MESAS)
    console.log(data?.mesas)
    
    const SalaVacia = () => {
        if (data?.users.length === 0){
            return (
                <View>
                    <Text sx={{fontSize: [30, 50], fontWeight: 'bold', textAlign: 'center'}}>Sala Vacia</Text>
                    <TouchableOpacity>
                        <Text>Se el primero en crear una mesa</Text>
                    </TouchableOpacity>
                </View>
            )
            
        }
    }
    return(
        <View style={styles.todo}>
            <Image
                source={require("../assets/FondoAmarillo.png")}
                style={{width: '100%', position: 'absolute', height: '60%'}}
            ></Image>
            <View >
                
                {
                    data && data?.mesas.map(m => {
                        return <Mesa users={m.users}/>
                    })
                }
            </View>
        </View>
    )
}


// export function Sala({navigation}){
//     return (
//         <View style={{flex: 1}}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Text style={{fontWeight: 'bold'}}>Atras</Text>
//             </TouchableOpacity>
//             <View style={styles.container}>
//                 <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Mesa')}>
//                     <Text style={{fontWeight: 'bold'}}>Mesa Publica</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('MesaPrivada')}>
//                     <Text style={{fontWeight: 'bold'}}>Mesa Privada</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// };



// export function MesaPrivada({navigation}){
//     return(
//         <View style={{flex: 1}}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Text style={{fontWeight: 'bold'}}>Atras</Text>
//             </TouchableOpacity>
//             <View style={styles.container}>
//                 <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('CrearMesa')}>
//                     <Text style={{fontWeight: 'bold'}}>Crear Mesa</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('UnirseAMesa')}>
//                     <Text style={{fontWeight: 'bold'}}>Unirse a una mesa</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export function CrearMesa({navigation}){
//     return(
//         <View style={{flex: 1}}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Text style={{fontWeight: 'bold'}}>Atras</Text>
//             </TouchableOpacity>
//             <Formik
//                 initialValues={{ codigo: ''}}
//                 // onSubmit={handlerSubmit}
//                 // validationSchema={validations}
//             >
//                 {({ handleChange, handleBlur, handleSubmit, values}) => (
//                 <View style={styles.container} >
//                     <Text>Crear una mesa para hacer Pair Programing con tus amigos!</Text>
//                     <Text style={{fontWeight: 'bold', marginTop: 10}}>CODIGO:</Text>
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={handleChange('codigo')}
//                         onBlur={handleBlur('codigo')}
//                         value={values.codigo}
//                     />
//                     <TouchableOpacity style={styles.boton}  onPress={handleSubmit}>
//                         <Text style={{fontWeight: 'bold'}}>Crear</Text>
//                     </TouchableOpacity>
//                 </View>
//                 )}
//             </Formik>
//         </View>
//     )
// }

// export function UnirseAMesa({navigation}){


//     return(
//         <View style={{flex: 1}}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Text style={{fontWeight: 'bold'}}>Atras</Text>
//             </TouchableOpacity>
//             <Formik
//                 initialValues={{ codigo: ''}}
//                 // onSubmit={handlerSubmit}
//                 // validationSchema={validations}
//             >
//                 {({ handleChange, handleBlur, handleSubmit, values}) => (
//                 <View style={styles.container} >
//                     <Text>Escribe el codigo para unirte a la mesa!</Text>
//                     <Text style={{fontWeight: 'bold', marginTop: 10}}>CODIGO:</Text>
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={handleChange('codigo')}
//                         onBlur={handleBlur('codigo')}
//                         value={values.codigo}
//                     />
//                     <TouchableOpacity style={styles.boton}  onPress={handleSubmit}>
//                         <Text style={{fontWeight: 'bold'}}>Unirse</Text>
//                     </TouchableOpacity>
//                 </View>
//                 )}
//             </Formik>
//         </View>
//     )
// }




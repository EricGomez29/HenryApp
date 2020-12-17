import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { GET_MESAS } from '../Querys/userQuery';
import { useQuery } from '@apollo/client';

export function Mesa({navigation, users}){
    const [personas, setPersonas] = useState(users)

    // function SumarPersonas(){
    //     setPersonas(personas + 1)
    //     navigation.navigate('#')
    // }

    return (
        <View style={{flex: 1}} >
             <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{fontWeight: 'bold'}}>Atras</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.mesa}>
                    <View >
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mesa Nº: 1</Text>
                        {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>1</Text> */}
                    </View>
                    <Text>{personas.length}/8</Text>
                    <TouchableOpacity style={styles.botonMesa} disabled={personas === 8}>
                        <Text style={{fontWeight: 'bold'}}>Unirse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export function Mesas(){
    const { loading, data, error } = useQuery(GET_MESAS)
    console.log(data?.mesas)
    return(
        <View>
            {
                data && data?.mesas.map(m => {
                    return <Mesa users={m.users}/>
                })
            }
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




//estilos

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    boton: {
        backgroundColor: 'yellow',
        borderRadius: 15,
        height: 30, 
        width: '70%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 0
    },
    input: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'yellow',
        height: 30,
        width: '70%',
        marginTop: 5,
        justifyContent: "center"
    },
    mesa: {
        width: '80%',
        height: 100,
        backgroundColor: 'yellow',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15

    },
    botonMesa: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30, 
        width: '40%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 0
    },
    
})
import {gql} from '@apollo/client';

export const ADD_COHORTE = gql`
    mutation AddCohorte($fecha: String){
        addCohorte(fecha: $fecha){
            date
            number
            _id
        }
    }
`;

export const EDIT_FECHA_COHORTE = gql`
    mutation EditFechaCohorte($fecha: String, $id: String) {
        editFechaCohorte(fecha: $fecha, id:$id){
            date
            number
            _id
        }
    }
`;
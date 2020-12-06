import styled from 'styled-components/native';
import { yellow, black, white }  from './globalsVariables'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${white};
    color: ${black};
    max-width: 650px;
    width: 90%;
    margin: 0 auto;
`
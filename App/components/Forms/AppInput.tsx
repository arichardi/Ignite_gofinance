import React from 'react'
import { TextInputProps } from 'react-native'
import {
    Container,
} from './AppInputStyle'

type Props = TextInputProps

export default function AppInput({...rest}: Props){
    return(
        <Container { ...rest } />
    )
}
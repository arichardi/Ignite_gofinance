import React from 'react'
import { TextInputProps } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import {Container, Error} from './AppInputFormStyle'
import AppInput from './AppInput'

interface Props extends TextInputProps {
    control: Control;
    name: string;
    error: string;
}

export default function AppInputForm({control , name, error, ...rest}: Props){
    return(
        <Container>
            <Controller
                control={control}
                name={name}
                render={ ({ field: { onChange, value }}) => (
                <AppInput 
                    onChangeText={onChange}
                    value={value}
                    {...rest} 
                />
                )}
            />
        { error && <Error>{error}</Error>}
        </Container>
    )
}
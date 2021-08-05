import React from "react";
import { Container, Title } from './AppButtonStyle'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
title: String;
}

export default function AppButton({title, ...rest}: Props){

    return (
        <Container {...rest} >
            <Title>{title}</Title>
        </Container>
    )
}
import React from "react";
import { Container, Title } from './AppButtonStyle'
import { RectButtonProps } from 'react-native-gesture-handler'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
    title: String;
    onPress: () => void;
}

export default function AppButton({title, onPress, ...rest}: Props){

    return (
        <Container {...rest} onPress={onPress} >
            <Title>{title}</Title>
        </Container>
    )
} 
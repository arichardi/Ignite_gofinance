import React from 'react';
import {
    Container,
    Title,
    Icon,
} from './CategorySelectStyle'

interface Props {
    title: string;
    onPress: () => void;
}

export default function CategorySelect({title, onPress} : Props){
    return(
        <Container onPress={onPress}>
            <Title>{title}</Title>
            <Icon name='chevron-down'/>
        </Container>
    )
}
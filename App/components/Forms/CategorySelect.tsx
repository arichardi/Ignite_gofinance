import React from 'react';
import {
    Container,
    Title,
    Icon,
} from './CategorySelectStyle'

interface Props {
    title: string;
}

export default function CategorySelect({title} : Props){
    return(
        <Container>
            <Title>{title}</Title>
            <Icon name='chevron-down'/>
        </Container>
    )
}
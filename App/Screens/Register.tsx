import React from 'react'

import {
    Container,
    Header,
    Title,
    Form,
} from './RegisterStyles'

import AppInput from '../components/Forms/AppInput'

export default function Register(){
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <AppInput 
                    placeholder='nome'
                />
                <AppInput 
                    placeholder='preço'
                />
            </Form>

        </Container>
    )
}
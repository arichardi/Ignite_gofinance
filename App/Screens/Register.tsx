import React from 'react'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
} from './RegisterStyles'

import AppInput from '../components/Forms/AppInput'
import AppButton from '../components/Forms/AppButton'

export default function Register(){
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                <AppInput placeholder='nome' />
                <AppInput placeholder='preço'/>
                </Fields>
                <AppButton title='Enviar'/>
            </Form>

        </Container>
    )
}
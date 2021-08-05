import React from 'react'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './RegisterStyles'

import AppInput from '../components/Forms/AppInput'
import AppButton from '../components/Forms/AppButton'
import TransactionTypeButton from '../components/Forms/TransactionTypeButton'

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
                    <TransactionTypes>
                        <TransactionTypeButton type='up' title='Income' />
                        <TransactionTypeButton type='down' title='Outcome' />
                    </TransactionTypes>
                </Fields>
                <AppButton title='Enviar'/>
            </Form>

        </Container>
    )
}
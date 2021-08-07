import React, {useState} from 'react'

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

    const [ transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type : 'up' | 'down'){
        setTransactionType(type)
    }

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
                        <TransactionTypeButton
                            type='up'
                            title='Income'
                            onPress={ () => handleTransactionTypeSelect('up')}
                            isActive={ transactionType === 'up'}
                        />
                        <TransactionTypeButton
                            type='down'
                            title='Outcome'
                            onPress={ () => handleTransactionTypeSelect('down')}
                            isActive={ transactionType === 'down'}
                        />
                    </TransactionTypes>
                </Fields>
                <AppButton title='Enviar'/>
            </Form>

        </Container>
    )
}
import React, {useState} from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './RegisterStyles'

import AppInputForm from '../components/Forms/AppInputForm'
import AppButton from '../components/Forms/AppButton'
import TransactionTypeButton from '../components/Forms/TransactionTypeButton'
import CategorySelect from '../components/Forms/CategorySelect'
import CategoryScreen from './CategoryScreen'

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    amount: Yup.number().required('O valor é obrigatório').positive('Informe um valor positivo').typeError('informe um valor numérico')
})

export default function Register(){

    //States

    const [ transactionType, setTransactionType] = useState('');
    const [ categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })


    //-------------------------------------------------------------------

    //Functions

    function handleTransactionTypeSelect(type : 'up' | 'down'){
        setTransactionType(type)
    }

    function handleOpenCategoryModal(){
        setCategoryModalOpen(true)
    }
    function handleCloseCategorySelect(){
        setCategoryModalOpen(false)
    }

    function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo da transação');

        if(category.key === 'category')
            return Alert.alert('Selecione a categoria da transação')

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        
        console.log(data)
    }

    //--------------------------------------------------------------------

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <AppInputForm 
                    name="name"
                    control={control}
                    placeholder='nome'
                    autoCapitalize='characters'
                    autoCorrect={false}
                    error={errors.name && errors.name.message}
                    />
                    <AppInputForm
                    name="amount"
                    control={control}
                    placeholder='preço'
                    keyboardType='numeric'
                    error={errors.amount && errors.amount.message}
                    />
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

                    <CategorySelect title={category.name} onPress={handleOpenCategoryModal}/>

                </Fields>
                <AppButton title='Enviar' onPress={handleSubmit(handleRegister)} />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategoryScreen 
                    category={category}
                    closeSelectCategory={handleCloseCategorySelect}
                    setCategory={setCategory}
                />
            </Modal>
        </Container>
        </TouchableWithoutFeedback>
    )
}
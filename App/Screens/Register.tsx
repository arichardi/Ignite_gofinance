import React, {useState} from 'react'
import { Modal } from 'react-native'
import { useForm } from 'react-hook-form'
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './RegisterStyles'

import AppInput from '../components/Forms/AppInput'
import AppInputForm from '../components/Forms/AppInputForm'
import AppButton from '../components/Forms/AppButton'
import TransactionTypeButton from '../components/Forms/TransactionTypeButton'
import CategorySelect from '../components/Forms/CategorySelect'
import CategoryScreen from './CategoryScreen'

interface FormData {
    name: string;
    amount: string;
}


export default function Register(){

    //States

    const [ transactionType, setTransactionType] = useState('');
    const [ categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { control, handleSubmit} = useForm()


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
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <AppInputForm 
                    placeholder='nome' 
                    name="name"
                    control={control}
                    />
                    <AppInputForm
                    placeholder='preço'
                    name="amount"
                    control={control}
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
    )
}
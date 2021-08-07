import React, {useState} from 'react'
import { Modal } from 'react-native'
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
import CategorySelect from '../components/Forms/CategorySelect'
import CategoryScreen from './CategoryScreen'

export default function Register(){

    //States

    const [ transactionType, setTransactionType] = useState('');
    const [ categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

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

    //--------------------------------------------------------------------

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

                    <CategorySelect title={category.name} onPress={handleOpenCategoryModal}/>

                </Fields>
                <AppButton title='Enviar'/>
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
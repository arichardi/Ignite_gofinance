import React, {useState} from 'react'
import { FlatList } from 'react-native'
import { categories } from '../utils/category'
import AppButton from '../components/Forms/AppButton'
import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
    Button,
    ButtonText,
} from './CategoryScreenStyle'

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: string;
    setCategory: (category: Category) => void
    closeSelectCategory: () => void
}

export default function CategoryScreen({category, setCategory, closeSelectCategory}: Props){
    return(
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList 
                data={categories}
                style={{flex: 1, width: '100%',}}
                ItemSeparatorComponent={ () => <Separator />}
                keyExtractor={ (item) => item.key}
                renderItem={ ({item}) => (
                <Category>
                    <Icon name={item.icon} />
                    <Name>{item.name}</Name>
                </Category>
                )}
            />
            <Footer>
                <AppButton title='Selecionar' />
            </Footer>
        </Container>
    )
}
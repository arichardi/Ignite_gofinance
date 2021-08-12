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
} from './CategoryScreenStyle'

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void
    closeSelectCategory: () => void
}

export default function CategoryScreen({category, setCategory, closeSelectCategory}: Props){

    function handleCategorySelect(category : Category){
        setCategory(category)
    }

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
                <Category 
                onPress={ () => handleCategorySelect(item)}  
                isActive={category.key === item.key}
                >
                    <Icon name={item.icon} />
                    <Name>{item.name}</Name>
                </Category>
                )}
            />
            <Footer>
                <AppButton title='Selecionar' onPress={closeSelectCategory}/>
            </Footer>
        </Container>
    )
}
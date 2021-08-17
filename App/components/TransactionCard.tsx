import React from 'react'
import {
Container,
Title,
Amount,
Category,
Icon,
Footer,
CategoryName,
Date,
} from './TransactionCardStyles'
import {categories} from '../utils/category'



export interface TransactionDataProps {
    id: string;
    type: 'positive' | 'negative'
    name: string;
    amount: string;
    category: string;
    date: string;
    }

interface Props {
    data: TransactionDataProps;
}


export function TransactionCard({data} : Props) {

    const category = categories.filter(
        item => item.key === data.category
    )[0];

    return (
        <Container>
            <Title>{data.name}</Title>
            <Amount type={data.type}>
                { data.type == 'negative' && '- '}
                {data.amount}
                </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon}/>
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}
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

interface Category {
    name: string;
    icon: string;
}

export interface TransactionDataProps {
    id: string;
    type: 'positive' | 'negative'
    title: string;
    amount: string;
    category: Category;
    date: string;
    }

interface Props {
    data: TransactionDataProps;
}


export function TransactionCard({data} : Props) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount type={data.type}>
                { data.type == 'negative' && '- '}
                {data.amount}
                </Amount>
            <Footer>
                <Category>
                    <Icon name={data.category.icon}/>
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}
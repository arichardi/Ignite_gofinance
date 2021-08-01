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

export default function TransactionCard() {
    return (
        <Container>
            <Title>Desenvolvimento de site</Title>
            <Amount>R$ 12.000,00</Amount>
            <Footer>
                <Category>
                    <Icon name='dollar-sign'/>
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <Date>13/04/2021</Date>
            </Footer>
        </Container>
    )
}
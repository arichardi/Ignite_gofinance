import React from 'react'
import { StatusBar} from 'react-native'
import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    ScrollCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
} from './dashboardStyles'


import HighlightCard from '../components/HighlightCard'
import {TransactionCard , TransactionDataProps } from '../components/TransactionCard'


export default function Dashboard(){

    const data: TransactionDataProps[] = [
        {
            id: '1',
            type: 'positive',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date: '13/04/2021'
        },
        {
            id: '2',
            type: 'negative',
            title: 'Hamburgueria',
            amount: 'R$ 57,00',
            category: {
                name: 'Alimentação',
                icon: 'coffee',
            },
            date: '10/04/2021'
        },
        {
            id: '3',
            type: 'negative',
            title: 'Aluguel apartamento',
            amount: 'R$ 2.300,00',
            category: {
                name: 'Casa',
                icon: 'shopping-bag',
            },
            date: '09/04/2021'
        },
    ]

    return (
        <Container>
            <StatusBar />
            <Header>
                <UserWrapper>
            <UserInfo>
                <Photo 
                source={{ uri: 'https://avatars.githubusercontent.com/u/64014271?v=4'}}
                />
                <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Andre</UserName>
                </User>
            </UserInfo>

            <LogoutButton onPress={ () => {}}>
                <Icon name='power' />
            </LogoutButton>

            </UserWrapper>
            </Header>

                < ScrollCards >
                    <HighlightCard 
                        type='up' 
                        title='Entrada' 
                        amount='R$ 17.400,00' 
                        lastTransaction='Última entrada dia 13 de abril'/>
                    <HighlightCard 
                        type='down' 
                        title='Saida' 
                        amount='R$ 1.259,00' 
                        lastTransaction='Última saida dia 03 de abril'/>
                    <HighlightCard 
                        type='total' 
                        title='Total' 
                        amount='R$ 16.141,00' 
                        lastTransaction='De 1 à 6 de abril'/>

                </ScrollCards>

                <Transactions>
                    <Title>Listagem</Title>
                    <TransactionList 
                        data={data}
                        keyExtractor={ item => item.id}
                        renderItem={ ({item}) => <TransactionCard data={item} />}
                    />
                </Transactions>
            
        </Container>
    )
}


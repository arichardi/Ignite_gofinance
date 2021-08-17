import React, {useState, useEffect, useCallback} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
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

    //variables --------------------------------

    const [ data, setData ] = useState<TransactionDataProps[]>([])

    const dataKey = '@gofinance:Transactions'
  
    //functions ----------------------------------

    async function loadTransactions(){
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response): []

        const transactionsFormatted: TransactionDataProps[] = transactions
        .map( (item: TransactionDataProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format(new Date(item.date))

            return {
                id: item.id,
                name: item.name,
                amount: amount,
                type: item.type,
                category: item.category,
                date: date,
            }
        });

        setData(transactionsFormatted)
    }

    useEffect( () => {
        loadTransactions();
   
    }, [])

    useFocusEffect(useCallback( () => {
        loadTransactions();
    }, []));

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


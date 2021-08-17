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

interface HighlightProps {
    total: string
}
interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps; 
}   


export default function Dashboard(){

    //variables --------------------------------

    const [ transactions, setTransactions ] = useState<TransactionDataProps[]>([])
    const [HighlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

    const dataKey = '@gofinance:Transactions'
  
    //functions ----------------------------------

    async function loadTransactions(){
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response): []

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: TransactionDataProps[] = transactions
        .map( (item: TransactionDataProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount)
            }else{
                expensiveTotal += Number(item.amount)
            }

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

        setTransactions(transactionsFormatted)

        const allcost = entriesTotal - expensiveTotal;

        setHighlightData({
            entries:{ total: entriesTotal.toLocaleString('pt-BR', {
                 style: 'currency',
                 currency: 'BRL', 
                }) },
            expensives: {total: expensiveTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL', 
               })},
            total: {total: allcost.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL', 
               })}
        });
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
                        amount={HighlightData.entries.total} 
                        lastTransaction='Última entrada dia 13 de abril'/>
                    <HighlightCard 
                        type='down' 
                        title='Saida' 
                        amount={HighlightData.expensives.total}  
                        lastTransaction='Última saida dia 03 de abril'/>
                    <HighlightCard 
                        type='total' 
                        title='Total' 
                        amount={HighlightData.total.total}
                        lastTransaction='De 1 à 6 de abril'/>

                </ScrollCards>

                <Transactions>
                    <Title>Listagem</Title>
                    <TransactionList 
                        data={transactions}
                        keyExtractor={ item => item.id}
                        renderItem={ ({item}) => <TransactionCard data={item} />}
                    />
                </Transactions>
            
        </Container>
    )
}


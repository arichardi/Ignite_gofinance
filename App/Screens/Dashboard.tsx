import React, {useState, useEffect, useCallback} from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
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
    LoadContainer,
} from './dashboardStyles'


import HighlightCard from '../components/HighlightCard'
import {TransactionCard , TransactionDataProps } from '../components/TransactionCard'

interface HighlightProps {
    total: string;
    lastTransaction: string;
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
    const [isLoading, setIsLoading ] = useState(true)
    const theme = useTheme();

    const dataKey = '@gofinance:Transactions'
  
    //functions ----------------------------------

    function getLastTransActionDate( collection: TransactionDataProps[], type: 'positive' | 'negative'){
        const lastTransaction = new Date(
             Math.max.apply(Math, collection
            .filter( transaction => transaction.type === type)
            .map( transaction => new Date(transaction.date).getTime())
            ));
        
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'short'})}`

    }

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

        const lastTransactionEntries =  getLastTransActionDate(transactions, 'positive')
        const lastTransactionExpensives =  getLastTransActionDate(transactions, 'negative')
        const totalInterval = `01 a ${lastTransactionExpensives}`;

        const allcost = entriesTotal - expensiveTotal;

        setHighlightData({
            entries:{ total: entriesTotal.toLocaleString('pt-BR', {
                 style: 'currency',
                 currency: 'BRL', 
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`
             },
            expensives: {total: expensiveTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL', 
               }),
               lastTransaction: `Última entrada dia ${lastTransactionExpensives}`
            },
            total: {total: allcost.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL', 
               }),
               lastTransaction: totalInterval
            }
        });

        setIsLoading(false)

    }

    useEffect( () => {
        loadTransactions();
   
    }, [])

    useFocusEffect(useCallback( () => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading ? 
                <LoadContainer>
                   <ActivityIndicator color={theme.colors.secondary} size='large'/>
                </LoadContainer> :
            <>
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
                        lastTransaction={HighlightData.entries.lastTransaction}/>
                    <HighlightCard 
                        type='down' 
                        title='Saida' 
                        amount={HighlightData.expensives.total}  
                        lastTransaction={HighlightData.expensives.lastTransaction}/>
                    <HighlightCard 
                        type='total' 
                        title='Total' 
                        amount={HighlightData.total.total}
                        lastTransaction={HighlightData.total.lastTransaction}/>

                </ScrollCards>

                <Transactions>
                    <Title>Listagem</Title>
                    <TransactionList 
                        data={transactions}
                        keyExtractor={ item => item.id}
                        renderItem={ ({item}) => <TransactionCard data={item} />}
                    />
                </Transactions>
            </>
            }
        </Container>
    )
}


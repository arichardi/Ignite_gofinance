import React, {useEffect, useState, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectIcon,
    MonthSelectButton,
    Month,
    LoadContainer,
} from './ResumeScreenStyle'

import HistoryCard from '../components/HistoryCard'
import { categories } from '../utils/category';
import { RFValue } from 'react-native-responsive-fontsize'


interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: number;
    percentFormatted: string;
}

export default function ResumeScreen(){

    //variables -----------------------------------------------

    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true)
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
    const [selectedDate, setSelectedDate] = useState(new Date())

    //functions -----------------------------------------------

    function handleDateChange(action: 'next' | 'prev'){
        setIsLoading(true)

        if(action === 'next'){
            const newDate = addMonths(selectedDate, 1)
            setSelectedDate(newDate)
        }else{
            const newDate = subMonths(selectedDate, 1)
            setSelectedDate(newDate)
        }
    }

    async function loadData(){
        const dataKey = '@gofinance:Transactions';
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted
        .filter( (expensive: TransactionData) => 
        expensive.type === 'negative' && 
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear() 
        )

        const expensivesTotal = expensives
        .reduce( (acc: number, item: TransactionData) => {
            return acc + Number(item.amount);
        },0)

        console.log(expensivesTotal)

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach( (expensive: TransactionData) => {
                if(expensive.category === category.key){
                    categorySum =+ Number(expensive.amount);
                }
            })

            if(categorySum > 0){

            const totalFormatted = categorySum.toLocaleString('pt-Br', {
                style: 'currency',
                currency: 'BRL'
            })

            const percent = (categorySum / expensivesTotal * 100)
            const percentFormatted = `${percent.toFixed(0)}%`

            totalByCategory.push({
                key: category.key,
                name: category.name,
                total: categorySum,
                totalFormatted: totalFormatted,
                color: category.color,
                percent: percent,
                percentFormatted: percentFormatted,
            })}

        })

        setTotalByCategories(totalByCategory)
        setIsLoading(false)

    }

    useEffect( () => {
        loadData()
    }, [selectedDate])

    useFocusEffect( useCallback( () => {
        loadData();
    }, []));

    //RN Screen Component --------------------------------------

    return(
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

            {
            isLoading ? 
            <LoadContainer>
            <ActivityIndicator color={theme.colors.secondary} size='large'/>
            </LoadContainer> :


            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                }}
            >

            <MonthSelect>
                <MonthSelectButton onPress={ () => handleDateChange('prev')}>
                    <MonthSelectIcon name='chevron-left' />
                </MonthSelectButton>
                <Month> {format(selectedDate, 'MMM, yyyy', {locale: ptBR})} </Month>
                <MonthSelectButton onPress={ () => handleDateChange('next')} >
                    <MonthSelectIcon name='chevron-right' />
                </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
                <VictoryPie
                    colorScale={totalByCategories.map( category => category.color)}
                    style={{
                        labels: {
                             fontSize: RFValue(18),
                            fontWeight: 'bold',
                            fill: '#fff'
                            }
                    }}
                    labelRadius={70}
                    data={totalByCategories}
                    x='percentFormatted'
                    y='total'
                />
            </ChartContainer>

                { totalByCategories.map( item => (
                <HistoryCard 
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                />))
                }
            </Content>

            }
        </Container>
    )
}
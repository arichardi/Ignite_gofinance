import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
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

    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

    //functions -----------------------------------------------

    async function loadData(){
        const dataKey = '@gofinance:Transactions';
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted
        .filter( (expensive: TransactionData) => expensive.type === 'negative')

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

    }

    useEffect( () => {
        loadData()
    }, [])

    //RN Screen Component --------------------------------------

    return(
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

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

            <Content>
                { totalByCategories.map( item => (
                <HistoryCard 
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                />))
                }
            </Content>

        </Container>
    )
}
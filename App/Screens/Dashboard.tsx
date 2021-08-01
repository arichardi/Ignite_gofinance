import React from 'react'
import HighlightCard from '../components/HighlightCard'
import { StatusBar} from 'react-native'
import { 
    Container,
    Title,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    ScrollCards,
 } from './dashboardStyles'

export default function Dashboard(){
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
            <Icon name='power' />
            </UserWrapper>
            </Header>

                < ScrollCards 

                >
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
        </Container>
    )
}


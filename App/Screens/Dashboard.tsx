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
            <StatusBar StatusBarStyle="auto" />
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
                    <HighlightCard />
                    <HighlightCard />
                    <HighlightCard />
                </ScrollCards>
        </Container>
    )
}


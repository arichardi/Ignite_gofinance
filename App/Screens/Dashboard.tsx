import React from 'react'

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
 } from './dashboardStyles'

export default function Dashboard(){
    return (
        <Container>
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
            </UserWrapper>
            </Header>
        </Container>
    )
}


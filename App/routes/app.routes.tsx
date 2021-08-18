import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import {useTheme} from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Dashboard from '../Screens/Dashboard';
import Register from '../Screens/Register';
import ResumeScreen from '../Screens/ResumeScreen';

const { Navigator, Screen } = createBottomTabNavigator()


export default function AppRoutes(){

    const theme = useTheme();

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen 
                name='Listagem'
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    )),
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarLabelPosition: 'beside-icon',
                    tabBarStyle: { height: 60 },
                    
                }}
            />
            <Screen 
                name='Cadastrar'
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    )),
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarLabelPosition: 'beside-icon',
                    tabBarStyle: { height: 60 },
                }}
            />
            <Screen 
                name='Resumo'
                component={ResumeScreen}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    )),
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarLabelPosition: 'beside-icon',
                    tabBarStyle: { height: 60 },
                }}
            />
        </Navigator>
    );
}
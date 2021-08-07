import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import theme from './App/config/styles/theme';
import Dashboard from './App/Screens/Dashboard';
import Register from './App/Screens/Register';
import CategoryScreen from './App/Screens/CategoryScreen';


export default function App() {
  
  const [fontsloaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  if(!fontsloaded){
    return <AppLoading />
  }


  return (
    <ThemeProvider theme={theme}>
      <CategoryScreen />
    </ThemeProvider>
  
  )
  
}


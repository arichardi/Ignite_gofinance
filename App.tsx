import React from 'react';
import { ThemeProvider } from 'styled-components'

import theme from './App/config/styles/theme'
import Dashboard from './App/Screens/Dashboard';


export default function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  
  )
  
}


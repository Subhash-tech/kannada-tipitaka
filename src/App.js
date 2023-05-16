import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import ToastContext from './context/ToastContext'

import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound'

import NewTranslation from './pages/Translation/NewTranslation'

import GlobalStyles from './theme/GlobalStyles'
import theme from './theme/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContext>
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<Navigate to='/translator' replace />} />
          <Route path='/translator' element={<Dashboard />}>
            <Route path='' element={<NewTranslation />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ToastContext>
    </ThemeProvider>
  )
}

export default App
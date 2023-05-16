import React from 'react'
import { Outlet } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm'
import { CssBaseline } from '@material-ui/core'

import { useStyles } from './styles'

const Dashboard = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <header className={classes.mainHeader}>
        <h2> ಕನ್ನಡ ಟಿಪಿಟಕ</h2>
      </header>
      <main className={classes.content}>
        <ConfirmProvider>
          <Outlet />
        </ConfirmProvider>
      </main>
    </div>
  )
}

export default Dashboard

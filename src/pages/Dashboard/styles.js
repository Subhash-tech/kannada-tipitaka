import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
  },
  mainHeader: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '16px 24px',
    height: '50px',
    zIndex:10
  },
  mainContent: {
    display: 'flex',
    height: '100%',
    overflow: 'auto',
  },
}))

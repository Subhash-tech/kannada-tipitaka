import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: '0px 24px 0px 24px',
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    columnGap: '24px',
    marginTop: '16px',
  },
}))

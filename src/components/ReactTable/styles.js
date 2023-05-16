import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  table: {
    width: '100%',
    //backgroundColor: '#fff',
    borderCollapse: 'separate',
    borderSpacing: '0 2rem',
    //borderSpacing: '0 10',
    //overflow: 'auto',
  },
  th: {
    padding: '8px 0',
    textAlign: 'center',
    borderBottom: '1px solid #dee2e6',
  },
  bodyRow: {
    boxShadow: '0px 0px 9px 0px rgb(0 0 0 / 10%)',
    '&:hover': {
     // backgroundColor: 'rgb(245, 245, 245)',
    },
  },
  td: {
    marginTop:'10px',
    maxWidth: '675px',
    padding: '24px 0',
    textAlign: 'center',
    borderBottom: '1px solid #dee2e6',
    minHeight: '160px',
    maxHeight: '160px',
    overflow: 'auto',
  },
}))

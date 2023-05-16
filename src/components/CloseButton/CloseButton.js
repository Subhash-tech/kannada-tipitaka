import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = (props) =>
  makeStyles((theme) => ({
    closeIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      height: '35px',
      width: '35px',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: theme.palette.background.paper,
      '&:hover': {
        backgroundColor: theme.palette.background.hover,
      },
    },
  }))

const CloseButton = (props) => {
  const classes = useStyles(props)()

  const { onClickHandler } = props
  return (
    <div className={classes.closeIcon}>
      <CloseIcon onClick={onClickHandler} />
    </div>
  )
}

export default CloseButton

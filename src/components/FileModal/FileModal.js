import React from 'react'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import LoadingSpinner from '../LoadingSpinner'
import CloseButton from '../CloseButton/CloseButton'

const useStyles = (props) =>
  makeStyles((theme) => ({
    modalBody: {
      position: 'absolute',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      width: props.modalWidth,
      height: props.modalHeight,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      padding: '32px',
      borderRadius: '16px',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      //marginBottom: '24px'
    },
    modalTitle: {
      fontWeight: 600,
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100%',
      width: '100%',
      padding: '0 16px',
    },
    separator: {
      marginBottom: '4px',
    },
  }))

const StyledModal = (props) => {
  const classes = useStyles(props)()
  const { isModalOpen, modalTitle, modalCloseHandler, children, loaderSate } =
    props

  return (
    <Modal disableEnforceFocus disableAutoFocus open={isModalOpen}>
      <div className={classes.modalBody}>
        <div className={classes.titleContainer}>
          <Typography className={classes.modalTitle} variant='h4'>
            {modalTitle}
          </Typography>
          <CloseButton onClickHandler={() => modalCloseHandler()} />
        </div>
        {children}
        <LoadingSpinner loading={loaderSate} />
      </div>
    </Modal>
  )
}

export default StyledModal

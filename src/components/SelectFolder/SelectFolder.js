import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  inputField: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '32px',
  },
  inputLabelBox: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
  },
  inputLabel: {
    fontWeight: 600,
  },
  inputBox: {
    display: 'flex',
    flex: 3,
  },
  customInputDiv: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customInput: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customInputField: {
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
  },
  fileInputLabel: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    background: theme.palette.background.paper,
    padding: '5px 10px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'transform .2s ease-out',
    '&:hover': {
      backgroundColor: theme.palette.background.hover,
    },
  },
  fileInput: {
    opacity: 0,
    width: '0.1px',
    height: '0.1px',
    position: 'absolute',
  },
  deleteBtn: {
    width: '10%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const StyledSelectFolder = (props) => {
  const classes = useStyles()
  const {
    fileState: selectedFiles,
    onChangeHandler,
    deleteHandler,
    inputFieldId,
  } = props

  return (
    <div className={classes.inputField}>
      <div className={classes.inputLabelBox}>
        <Typography variant='body1' className={classes.inputLabel}>
          Folder
        </Typography>
      </div>
      <div className={classes.inputBox}>
        <div className={classes.customInputDiv}>
          <div className={classes.customInput}>
            <label className={classes.fileInputLabel} htmlFor={inputFieldId}>
              Browse
            </label>
            <div className={classes.customInputField}>
              {selectedFiles.length > 0
                ? `${selectedFiles.length} files selected`
                : 'No folder chosen'}
            </div>
          </div>
          <input
            className={classes.fileInput}
            type='file'
            directory=''
            webkitdirectory=''
            name={inputFieldId}
            id={inputFieldId}
            onChange={onChangeHandler}
          />
          <Button
            className={classes.deleteBtn}
            disabled={!Boolean(selectedFiles.length)}
            onClick={deleteHandler}
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StyledSelectFolder

import React from 'react'
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'
import { useConfirm } from 'material-ui-confirm'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'

//icons
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined'
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import CallMergeIcon from '@material-ui/icons/CallMerge'

//components
import ReactTable from '../../components/ReactTable/ReactTable'
import Editable from '../../components/Editable/Editable'

//utils
import { useToast } from '../../context/ToastContext'
import { getFileExtension } from '../../utils/helpers'

//styles and assets
import { useStyles } from './styles'

//redux
import {
  selectAllRows,
  selectOneRow,
  updateOneRow,
  joinRows,
  deleteSelectedRows,
  updateInitialState,
  changeTag,
  clearAll,
} from '../../redux/translationSlice'

const TAG_OPTIONS = [
  { value: 'p', label: 'p' },
  { value: 'h1', label: 'h1' },
  { value: 'h2', label: 'h2' },
  { value: 'h3', label: 'h3' },
  { value: 'h4', label: 'h4' },
  { value: 'h5', label: 'h5' },
  { value: 'h6', label: 'h6' },
]

const TranslationTable = (props) => {
  let tableRows = []
  let selectedRows = []

  const classes = useStyles()
  const dispatch = useDispatch()
  const confirmPopup = useConfirm()
  const { showNotification } = useToast()

  //console.log(useSelector((state) => state.translation))
  //console.log(props.language)

  const { paliRows, kannadaRows, selectedKannadaRows, selectedPaliRows } =
    useSelector((state) => state.translation)

  if (props.language === 'kannada') {
    tableRows = kannadaRows
    selectedRows = selectedKannadaRows
  }
  console.log('Rows', tableRows.length)
  if (props.language === 'pali') {
    tableRows = paliRows
    selectedRows = selectedPaliRows
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    const extension = getFileExtension(file.name)
    //console.log(extension)
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onloadend = () => {
      let rows

      if (extension === 'txt') {
        rows = reader.result.split('\n')
        rows = rows
          .filter((item) => item !== '\\n' || item !== '')
          .map((item) => ({
            id: nanoid(),
            isSelected: false,
            type: 'p',
            text: item,
          }))
      } else if (extension === 'json') {
        const jsonPayload = reader.result.toString()
        // console.log(
        //   'reader.result',
        //   typeof jsonPayload,
        //   jsonPayload,
        //   Array.isArray(jsonPayload)
        // )
        const dataObject = JSON.parse(jsonPayload, (key, value) =>
          value === '' ? '\n' : value
        )
        console.log(dataObject[0], dataObject[0].id)
        //check if the json has Id if not add one
        if (dataObject & dataObject[0] && dataObject[0].id) {
          rows = dataObject
        } else {
          rows = dataObject.map((data) => ({
            id: nanoid(),
            ...data,
          }))
        }
      }

      dispatch(
        updateInitialState({
          rows: rows,
          type: props.language,
        })
      )
    }
  }

  const editRowValue = (rowId, updatedValue, rowIndex) => {
    dispatch(
      updateOneRow({
        id: rowId,
        value: updatedValue,
        index: rowIndex,
        type: props.language,
      })
    )
  }

  const joinRowsHanlder = () => {
    if (selectedRows.length === 0) {
      showNotification(`Please select rows to join`, 'info')
      return
    }
    dispatch(joinRows({ type: props.language }))
  }

  const deleteRows = async () => {
    if (selectedRows.length === 0) {
      showNotification(`Please select rows to delete`, 'info')
      return
    }
    await confirmPopup({
      description: `This will delete the selected rows but still you can recover by undo`,
    })
    dispatch(deleteSelectedRows({ type: props.language }))
  }

  const tableColumns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Select',
      accessor: 'isSelected',
      Cell: ({ cell: { row } }) =>
        row.values.isSelected ? (
          <CheckBoxIcon
            className={classes.checkbox}
            onClick={() => {
              //console.log('checked')
              dispatch(
                selectOneRow({
                  id: row.values.id,
                  value: !row.values.isSelected,
                  type: props.language,
                })
              )
            }}
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            className={classes.checkbox}
            onClick={() => {
              //console.log('checked')
              dispatch(
                selectOneRow({
                  id: row.values.id,
                  value: !row.values.isSelected,
                  type: props.language,
                })
              )
            }}
          />
        ),
    },
    {
      Header: 'Tag',
      accessor: 'type',
    },
    {
      Header: 'Text',
      accessor: 'text',
      Cell: ({ cell }) => {
        const { row } = cell
        return (
          <Editable
            text={row.values.text}
            rowId={row.values.id}
            onSubmit={editRowValue}
            rowIndex={row.index}
            rowValue={7}
            tag={row.values.type}
          />
        )
      },
    },
  ]

  const downLoadContent = tableRows.map((item) => {
    return {
      id: item.id,
      type: item.type,
      text: item.text,
    }
  })

  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(downLoadContent))

  return (
    <div className={classes.translationContainer}>
      <div className={classes.btnContainer}>
        <div className={classes.selectMainContainer}>
          <div className={classes.checkboxContainer}>
            <label htmlFor={`select-${props.language}`}>Select all</label>
            <Checkbox
              id={`select-${props.language}`}
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(selectAllRows({ type: props.language }))
                } else {
                  dispatch(clearAll({ type: props.language }))
                }
              }}
            />
          </div>
          <div className={classes.selectContainer}>
            <select
              className={classes.select}
              onChange={(event) =>
                dispatch(
                  changeTag({
                    tagName: event.target.value,
                    type: props.language,
                  })
                )
              }
            >
              {TAG_OPTIONS.map((data) => (
                <option value={data.value}>{data.value}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={classes.actionBtnContainer}>
          <div>
            <Tooltip placement='bottom' title='upload file'>
              <label
                className={classes.fileInputLabel}
                htmlFor={`${props.language}`}
              >
                <CloudUploadOutlinedIcon />
              </label>
            </Tooltip>
            <input
              className={classes.fileInput}
              id={`${props.language}`}
              type='file'
              accept='.json,.txt'
              onChange={(e) => handleFileInputChange(e)}
            />
          </div>
          <Tooltip placement='bottom' title='Merge rows'>
            <Button
              variant='contained'
              className={classes.submit}
              onClick={joinRowsHanlder}
              disableFocusRipple
            >
              <CallMergeIcon />
            </Button>
          </Tooltip>
          <Tooltip placement='bottom' title='Clear selected'>
            <Button
              variant='contained'
              className={classes.submit}
              onClick={() => dispatch(clearAll({ type: props.language }))}
              disableFocusRipple
            >
              <ClearAllIcon />
            </Button>
          </Tooltip>
          <Tooltip placement='bottom' title='Delete rows'>
            <Button
              variant='contained'
              className={classes.submit}
              onClick={deleteRows}
              disableFocusRipple
            >
              <DeleteOutlinedIcon />
            </Button>
          </Tooltip>
          <Tooltip placement='bottom' title='Download'>
            <a
              href={dataStr}
              download='scene.json'
              className={classes.downloadBtn}
            >
              <CloudDownloadOutlinedIcon />
            </a>
          </Tooltip>
        </div>
      </div>
      {tableRows.length === 0 && (
        <div className={classes.tableContainer}>
          Please upload a file to start with..
        </div>
      )}
      {tableRows.length > 0 && (
        <div className={classes.tableContainer}>
          <ReactTable
            columns={tableColumns}
            data={tableRows}
            hiddenColumns={['id', 'type']}
          />
        </div>
      )}
    </div>
  )
}

export default TranslationTable

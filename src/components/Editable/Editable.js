import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import './Editable.css'

const Editable = ({ text, rowIndex, rowId, rowValue, tag, onSubmit }) => {
  const [showEdit, setShowEdit] = useState(false)
  const [inputValue, setInputValue] = useState(text || '')

  const getFormattedText = (tagName) => {
    switch (tagName) {
      case 'p':
        return (
          <p className='editable_display' onClick={() => setShowEdit(true)}>
            {text}
          </p>
        )
        break
      case 'h1':
        return (
          <h1 className='editable_display' onClick={() => setShowEdit(true)}>
            {text}
          </h1>
        )
        break
      case 'h2':
        return (
          <h2 className='editable_display' onClick={() => setShowEdit(true)}>
            {text}
          </h2>
        )
        break
      case 'h3':
        return (
          <h3 className='editable_display' onClick={() => setShowEdit(true)}>
            {text}
          </h3>
        )
        break
      case 'h4':
        return (
          <h4 className='editable_display' onClick={() => setShowEdit(true)}>
            {text}
          </h4>
        )
        break
      case 'h5':
        return (
          <h5 className='editable_display' onClick={() => setShowEdit(true)}>
            {text}
          </h5>
        )
        break
      case 'h6':
        return (
          <h6 className='editable_display' onClick={() => setShowEdit(true)}>
            {text}
          </h6>
        )
        break

      default:
        break
    }
  }

  let content = getFormattedText(tag)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(rowId, inputValue, rowIndex)
    setShowEdit(false)
    setInputValue('')
  }

  return (
    <div className='editable'>
      {showEdit ? (
        <form className='editable_form' onSubmit={handleSubmit}>
          <textarea
            style={{
              height: '100%',
              minHeight: '120px',
              maxHeight: '120px',
              overflow: 'auto',
              padding: '0px 8px',
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            spellCheck={false}
          />
          <div className='editable_footer'>
            <button type='submit'>Save</button>
            <CloseIcon onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        content
      )}
    </div>
  )
}

export default Editable

import React from 'react'
import TranslationTable from '../../components/TranslationTable/TranslationTable'

import { useStyles } from './styles'

const NewTranslation = () => {
  const classes = useStyles()

  return (
    <div className={classes.pageContainer}>
      <div className={classes.titleContainer}>
        <TranslationTable language='kannada' />
        <TranslationTable language='pali' />
      </div>
    </div>
  )
}

export default NewTranslation

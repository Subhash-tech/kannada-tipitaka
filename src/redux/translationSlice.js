import { nanoid } from 'nanoid'
import { createSlice, current } from '@reduxjs/toolkit'

//console.log(current(state))

const initialState = {
  kannadaRows: [],
  selectedKannadaRows: [],
  paliRows: [],
  selectedPaliRows: [],
}

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    updateInitialState: (state, action) => {
      const { payload } = action
      if (payload.type === 'kannada') {
        state.kannadaRows = payload.rows.filter((item) => {
          return item.text.length !== 0
        })
      }
      if (payload.type === 'pali') {
        state.paliRows = payload.rows.filter((item) => {
          return item.text.length !== 0
        })
      }
    },
    selectAllRows: (state, action) => {
      const { payload } = action
      if (payload.type === 'kannada') {
        // Map over the kannadaRows and change its checkbox state to true
        const selectedRows = state.kannadaRows.map((item) => {
          item.isSelected = true
          return item
        })
        // Map over the selectedrows and return only id to update selectedKannadaRows
        state.kannadaRows = selectedRows
        state.selectedKannadaRows = selectedRows.map((item) => item.id)
      }
      if (payload.type === 'pali') {
        // Map over the paliRows and change its checkbox state to true
        const selectedRows = state.paliRows.map((item) => {
          item.isSelected = true
          return item
        })
        // Map over the selectedrows and return only id to update selectedPaliRows
        state.paliRows = selectedRows
        state.selectedPaliRows = selectedRows.map((item) => item.id)
      }
    },
    clearAll: (state, action) => {
      const { payload } = action
      if (payload.type === 'kannada') {
        // Map over the kannadaRows and change its checkbox state to true
        const selectedRows = state.kannadaRows.map((item) => {
          item.isSelected = false
          return item
        })
        state.kannadaRows = selectedRows
        state.selectedKannadaRows = []
      }
      if (payload.type === 'pali') {
        // Map over the paliRows and change its checkbox state to true
        const selectedRows = state.paliRows.map((item) => {
          item.isSelected = false
          return item
        })
        state.paliRows = selectedRows
        state.selectedPaliRows = []
      }
    },
    selectOneRow: (state, action) => {
      const { payload } = action
      if (payload.type === 'kannada') {
        //find the row and update its checkbox state
        const updatedKannadaRows = state.kannadaRows.map((item) => {
          if (item.id === payload.id) {
            item.isSelected = payload.value
          }
          return item
        })

        let updatedSelectedRows = state.selectedKannadaRows
        //Check if the row is already in selectedRows, if there dont add if not then add
        if (payload.value && !state.selectedKannadaRows.includes(payload.id)) {
          updatedSelectedRows.push(payload.id)
        } else {
          updatedSelectedRows = updatedSelectedRows.filter((item) => {
            return item !== payload.id
          })
        }
        state.kannadaRows = updatedKannadaRows
        state.selectedKannadaRows = updatedSelectedRows
      }
      if (payload.type === 'pali') {
        // find the row and update its checkbox state
        const updatedPaliRows = state.paliRows.map((item) => {
          if (item.id === payload.id) {
            item.isSelected = payload.value
          }
          return item
        })

        let updatedSelectedRows = state.selectedPaliRows
        //Check if the row is already in selectedRows, if there dont add if not then add
        if (payload.value && !state.selectedPaliRows.includes(payload.id)) {
          updatedSelectedRows.push(payload.id)
        } else {
          updatedSelectedRows = updatedSelectedRows.filter((item) => {
            return item !== payload.id
          })
        }
        state.paliRows = updatedPaliRows
        state.selectedPaliRows = updatedSelectedRows
      }
    },
    updateOneRow: (state, action) => {
      const { payload } = action
      if (payload.type === 'kannada') {
        let updatedKannadaRows = state.kannadaRows
        // check if the value has any new line
        const newArray = payload.value.split('\n').map((item) => ({
          id: nanoid(),
          type: payload.tag,
          isSelected: false,
          text: item,
        }))

        if (newArray.length === 1) {
          // find the row and update its row value state
          updatedKannadaRows = state.kannadaRows.map((item) => {
            if (item.id === payload.id) {
              item.text = payload.value
            }
            return item
          })
        }
        if (newArray.length > 1) {
          // reomove the row of current index and the new rows
          updatedKannadaRows.splice(payload.index, 1, ...newArray)
        }

        state.kannadaRows = updatedKannadaRows
      }
      if (payload.type === 'pali') {
        let updatedpaliRows = state.paliRows
        // check if the value has any new line
        const newArray = payload.value.split('\n').map((item) => ({
          id: nanoid(),
          type: 'p',
          isSelected: false,
          text: item,
        }))

        if (newArray.length === 1) {
          // find the row and update its row value state
          updatedpaliRows = state.paliRows.map((item) => {
            if (item.id === payload.id) {
              item.text = payload.value
            }
            return item
          })
        }
        if (newArray.length > 1) {
          // reomove the row of current index and the new rows
          updatedpaliRows.splice(payload.index, 1, ...newArray)
        }

        state.paliRows = updatedpaliRows
      }
    },
    deleteSelectedRows: (state, action) => {
      const { payload } = action
      if (payload.type === 'kannada') {
        const rowsAfterDelete = state.kannadaRows.filter((item) => {
          return !state.selectedKannadaRows.includes(item.id)
        })

        state.kannadaRows = rowsAfterDelete
        state.selectedKannadaRows = []
      }
      if (payload.type === 'pali') {
        const rowsAfterDelete = state.paliRows.filter((item) => {
          return !state.selectedPaliRows.includes(item.id)
        })

        state.paliRows = rowsAfterDelete
        state.selectedPaliRows = []
      }
    },
    joinRows: (state, action) => {
      const { payload } = action
      if (payload.type === 'kannada') {
        let index
        let flag = true
        let joinedRow = {
          id: '',
          isSelected: false,
          text: '',
        }

        // Map over kanndaRows and return empty object if the row is selected before that
        // 1. find the first index to which rows need to merged
        // 2. if the id is in selectedRows then update the joinedRow object by concatinating the text with space

        let preparedRows = state.kannadaRows.map((item, i) => {
          if (state.selectedKannadaRows.includes(item.id)) {
            if (flag) {
              index = i
              flag = false
            }
            joinedRow = {
              ...joinedRow,
              id: item.id,
              type: item.type,
              text: joinedRow.text.concat(' ', item.text),
            }
            return {}
          }
          return item
        })

        // add the joinedRow at calculated index
        preparedRows[index] = joinedRow

        // reomve the empty object
        preparedRows = preparedRows.filter((item) => {
          return item.id !== undefined
        })
        state.kannadaRows = preparedRows
        state.selectedKannadaRows = []
      }
      if (payload.type === 'pali') {
        let index
        let flag = true
        let joinedRow = {
          id: '',
          isSelected: false,
          text: '',
        }

        // Map over kanndaRows and return empty object if the row is selected before that
        // 1. find the first index to which rows need to merged
        // 2. if the id is in selectedRows then update the joinedRow object by concatinating the text with space

        let preparedRows = state.paliRows.map((item, i) => {
          if (state.selectedPaliRows.includes(item.id)) {
            if (flag) {
              index = i
              flag = false
            }
            joinedRow = {
              ...joinedRow,
              id: item.id,
              type: item.type,
              text: joinedRow.text.concat(' ', item.text),
            }
            return {}
          }
          return item
        })

        // add the joinedRow at calculated index
        preparedRows[index] = joinedRow

        // reomve the empty object
        preparedRows = preparedRows.filter((item) => {
          return item.id !== undefined
        })

        state.paliRows = preparedRows
        state.selectedPaliRows = []
      }
    },
    changeTag: (state, action) => {
      const { payload } = action
      console.log(payload)
      if (payload.type === 'kannada') {
        const updatedRows = state.kannadaRows.map((item) => {
          if (state.selectedKannadaRows.includes(item.id)) {
            item.type = payload.tagName
            //item.isSelected = false
          }
          return item
        })

        state.kannadaRows = updatedRows
        //state.selectedKannadaRows = []
      }
      if (payload.type === 'pali') {
        const updatedRows = state.paliRows.map((item) => {
          if (state.selectedPaliRows.includes(item.id)) {
            item.type = payload.tagName
            //item.isSelected = false
          }
          return item
        })

        state.paliRows = updatedRows
        //state.selectedPaliRows = []
      }
    },
  },
})

export const {
  selectAllRows,
  clearAll,
  selectOneRow,
  updateOneRow,
  deleteSelectedRows,
  updateInitialState,
  joinRows,
  changeTag,
} = translationSlice.actions

export default translationSlice.reducer

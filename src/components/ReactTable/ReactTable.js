import React, { useEffect } from 'react'
import { useTable } from 'react-table'

import { useStyles } from './styles'

const StyledTable = (props) => {
  const classes = useStyles()
  const columns = React.useMemo(() => props.columns, [props.columns])
  const data = React.useMemo(() => props.data, [props.data])

  const tableInstance = useTable({
    columns: columns,
    data: data,
    initialState: {
      hiddenColumns: props.hiddenColumns || [],
    },
  })

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    tableInstance

  return (
    <>
      <table className={classes.table} {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th className={classes.th} {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row)

              return (
                // Apply the row props
                <tr
                  className={classes.bodyRow}
                  key={row.values.name}
                  {...row.getRowProps()}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td className={classes.td} {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default StyledTable

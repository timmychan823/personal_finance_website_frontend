import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import EditExpenditureButton from './EditExpenditureButton.jsx'
import DeleteExpenditureButton from './DeleteExpenditureButton.jsx'
import '../../styles/ExpenditureRow.css'

function ExpenditureRow(props) {
    const { expenditure } = props


    return (
        <TableRow key={expenditure.transactionID} className="tableRowExpenditure" onClick={() => { console.log("Row Clicked: " + expenditure.transactionID) }}>
            <TableCell>
                {expenditure.datetime}
            </TableCell>
            <TableCell>
                {expenditure.receiver}
            </TableCell>
            <TableCell>
                {expenditure.cost}
            </TableCell>
            <TableCell>
                <EditExpenditureButton {...expenditure} />
                <DeleteExpenditureButton url="http://localhost:8090/deleteExpenditureByID" params={"?transactionID=" + expenditure.transactionID}></DeleteExpenditureButton>
            </TableCell>
        </TableRow>
    )
}


export default ExpenditureRow

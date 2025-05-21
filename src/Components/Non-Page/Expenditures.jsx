import React, { useState, useContext, useEffect } from 'react';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';
import ExpenditureRow from './ExpenditureRow.jsx';
import PubSub from 'pubsub-js';
import { SignalWifiStatusbarConnectedNoInternet4Sharp } from '@mui/icons-material';
import { SnackBarContext } from './Context.jsx';

function Expenditures(props) { // [search, setSearch] and [expendituresList, setExpendituresList] from parent
  const { search, setSearch } = props
  const { expendituresList, setExpendituresList } = props



  const handlePageChange = (event, newPage) => {
    setSearch({
      ...search,
      controller: { ...search.controller, page: newPage }
    });
    console.log("hi")
  };

  const handleChangeRowsPerPage = (event) => {
    setSearch({
      ...search,
      controller: { ...search.controller, rowsPerPage: parseInt(event.target.value), page: 0 }
    });
  };




  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Datetime
            </TableCell>
            <TableCell>
              Receiver
            </TableCell>
            <TableCell>
              Cost
            </TableCell>
            <TableCell>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expendituresList.expendituresList.map((expenditure) => (
            <ExpenditureRow key={expenditure.transactionID} expenditure={expenditure} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={search.controller.page}
        count={expendituresList.expendituresCount}
        rowsPerPage={search.controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[20, 50, 100]}
        showFirstButton={true}
        showLastButton={true}
      />
    </Card>
  )


}

export default Expenditures;
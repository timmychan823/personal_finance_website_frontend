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
import { SnackBarContext } from './SnackBarContext.jsx';

function Expenditures(props) { //getData(), [search, setSearch] and [expendituresList, setExpendituresList] from parent
  const [search, setSearch] = useState({
    searchQuery: "",
    controller: { page: 0, rowsPerPage: 10 }
  })
  const [expendituresList, setExpendituresList] = useState({
    expendituresList: [],
    expendituresCount: 0
  })

  const { snackBarDispatch } = useContext(SnackBarContext)

  const getData = async () => {
    console.log("searchQuery: " + search.searchQuery)
    let url = `http://localhost:8090/getAllExpenditure?pageNo=${search.controller.page}&pageSize=${search.controller.rowsPerPage}`
    if (search.searchQuery != "") {
      url = `http://localhost:8090/getAllExpenditureByReceiver?receiver=${search.searchQuery}&pageNo=${search.controller.page}&pageSize=${search.controller.rowsPerPage}`
    }
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.status == 200) {
        const data = await response.json();
        snackBarDispatch({ show: "SHOW", type: "SHOW SUCCESS", message: "hi" })
        setExpendituresList({ expendituresList: data.content, expendituresCount: data.totalElements });
      } else {
        throw new Error('Request failed')
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getData()
  }, [search])


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
      controller: { ...search.controller, rowsPerPage: parseInt(event.target.value, 10), page: 0 }
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
        rowsPerPageOptions={[10, 20, 50]}
        showFirstButton={true}
        showLastButton={true}
      />
    </Card>
  )


}

export default Expenditures;
import { useState, useEffect } from 'react';
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

const Expenditures = () => {
  const [expendituresList, setExpendituresList] = useState([]);
  const [expendituresCount, setExpendituresCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10
  });


  const getData = async () => {
    console.log(searchQuery)
    let url = `http://localhost:8090/getAllExpenditure?pageNo=${controller.page}&pageSize=${controller.rowsPerPage}`
    if (searchQuery != "") {
      url = `http://localhost:8090/getAllExpenditureByReceiver?receiver=${searchQuery}&pageNo=${controller.page}&pageSize=${controller.rowsPerPage}`
    }
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.status == 200) {
        const data = await response.json();
        setExpendituresList(data.content);
        setExpendituresCount(data.totalElements);
      } else {
        throw new Error('Request failed')
      }
    } catch (error) {
      console.log(error);
    }

  };



  const turnSubscriptionToSearchQuery = (msg, data) => {
    setSearchQuery(data)
  }



  const subscriberevent = PubSub.subscribe('SearchQuery', turnSubscriptionToSearchQuery)



  useEffect(() => { getData() }, [controller]);

  useEffect(() => {
    getData()
  }, [searchQuery]);

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
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
          {expendituresList.map((expenditure) => (
            <ExpenditureRow expenditure={expenditure} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={controller.page}
        count={expendituresCount}
        rowsPerPage={controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
        showFirstButton={true}
        sbowLastButton={true}
      />
    </Card>
  )
}

export default Expenditures;
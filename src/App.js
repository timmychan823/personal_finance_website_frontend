import React, { createContext, useContext, useReducer } from 'react'
import './App.css';
import { Snackbar, Alert } from '@mui/material';
import ExpenditurePage from './Components/Page/ExpenditurePage.jsx';
import { SnackBarContext } from './Components/Non-Page/SnackBarContext.jsx';

export default function App(props) {
  const snackBarReducer = (state, action) => {
    if (action.show == "SHOW") {
      switch (action.type) {
        case "SHOW SUCCESS":
          return {
            ...state,
            open: true,
            level: "success",
            message: action.message
          }
        case "SHOW INFO":
          return {
            ...state,
            open: true,
            level: "info",
            message: action.message
          }
        case "SHOW WARNING":
          return {
            ...state,
            open: true,
            level: "warning",
            message: action.message
          }
        case "SHOW ERROR":
          return {
            ...state,
            open: true,
            level: "error",
            message: action.message
          }
      }
    } else {
      return {
        ...state,
        open: false
      }
    }

  }
  const [snackBarVariable, snackBarDispatch] = useReducer(snackBarReducer, { open: false, level: "", message: "" })

  return (
    // <div>
    //   <DatetimeRangeSelector />
    //   <SearchExpenditure />
    //   <AddExpenditureButton />
    //   <Expenditures />
    //   <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
    //     <Alert
    //       severity={this.state.successAlertMessage}
    //       variant="filled"
    //       sx={{ minWidth: '400px' }}
    //     >
    //       {this.state.successAlertMessage}
    //     </Alert>
    //   </Snackbar>
    // </div>
    <>
      <SnackBarContext.Provider value={{ snackBarDispatch }}>
        <Snackbar open={snackBarVariable.open} autoHideDuration={6000} onClose={() => snackBarDispatch({ show: "DONT SHOW", type: "", message: "" })}>
          <Alert
            severity={snackBarVariable.level}
            variant="filled"
            sx={{ minWidth: '400px' }}>
            {snackBarVariable.message}
          </Alert>
        </Snackbar>
        <ExpenditurePage>
        </ExpenditurePage>
      </SnackBarContext.Provider>
    </>
  )
}


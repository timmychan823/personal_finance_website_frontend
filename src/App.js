<<<<<<< HEAD
import React, { createContext, useContext, useReducer, useState } from 'react'
import './App.css';
import { ListItem, List, Snackbar, Drawer, Alert, Backdrop, CircularProgress, Toolbar, AppBar, Typography, Button, Stack, Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu"
import { Route, Routes, Link, Navigate } from "react-router-dom";
import ExpenditurePage from './Components/Page/ExpenditurePage.jsx';
import HomePage from './Components/Page/HomePage.jsx';
import { SnackBarContext } from './Components/Non-Page/Context.jsx';
import { IsLoadingContext } from './Components/Non-Page/Context.jsx';
import RemindersPage from './Components/Page/RemindersPage.jsx';
import Box from "@mui/material/Box"
=======
import React, { createContext, useContext, useReducer } from 'react'
import './App.css';
import { Snackbar, Alert } from '@mui/material';
import ExpenditurePage from './Components/Page/ExpenditurePage.jsx';
import { SnackBarContext } from './Components/Non-Page/SnackBarContext.jsx';
>>>>>>> c81439c75d229ced839b60e466e373cd926236bc

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
<<<<<<< HEAD
  const [IsLoading, setIsLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [anchorE1, setAnchorE1] = useState(null)
  const open2 = Boolean(anchorE1 != null && anchorE1.id == "investment_button")
  const open = Boolean(anchorE1 != null && anchorE1.id == "regular_button")

  const handleMenuOpen = (event) => {
    setAnchorE1(event.currentTarget)
    console.log(event.currentTarget)
  }
  function handleMenuClose(event) {
    setAnchorE1(null);
  }


  return (
    <>
      <SnackBarContext.Provider value={{ snackBarDispatch }}>
        <IsLoadingContext.Provider value={{ setIsLoading }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton>
                <MenuIcon onClick={() => setIsDrawerOpen(true)}></MenuIcon>
              </IconButton>
              <Typography variant='h6' sx={{ flexGrow: 1 }}>Personal Finance Website</Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor='left'
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}>
            <Stack>
              <Accordion expanded={false}>
                <AccordionSummary>
                  <Link to="/">Home</Link>
                </AccordionSummary>
              </Accordion>
              <Accordion disableGutters>
                <AccordionSummary>Regular</AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      Income
                    </ListItem>
                    <ListItem>
                      <Link to="/expenditure" underline="none">Expenditure</Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/reminders" underline="none">Reminders</Link>
                    </ListItem>
                  </List>
                </AccordionDetails>

              </Accordion>

              <Accordion disableGutters>
                <AccordionSummary>Investment</AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      Equity
                    </ListItem>
                    <ListItem>
                      Bond
                    </ListItem>
                  </List>
                </AccordionDetails>

              </Accordion>

            </Stack>
          </Drawer>


          <Snackbar open={snackBarVariable.open} autoHideDuration={6000} onClose={() => snackBarDispatch({ show: "DONT SHOW", type: "", message: "" })}>
            <Alert
              severity={snackBarVariable.level}
              variant="filled"
              sx={{ minWidth: '400px' }}>
              {snackBarVariable.message}
            </Alert>
          </Snackbar>
          <Backdrop open={IsLoading}>
            <CircularProgress></CircularProgress>
          </Backdrop>
          <Box component="section" sx={{ p: 2 }}>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/expenditure" element={<ExpenditurePage />}></Route>
              <Route path="/reminders" element={<RemindersPage />}>
              </Route>
            </Routes>
          </Box>





        </IsLoadingContext.Provider>
      </SnackBarContext.Provider >
=======

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
>>>>>>> c81439c75d229ced839b60e466e373cd926236bc
    </>
  )
}


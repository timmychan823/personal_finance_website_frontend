import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Expenditures from "./Components/Non-Page/Expenditures.jsx"
import AddExpenditureButton from './Components/Non-Page/AddExpenditureButton.jsx';
import PubSub from 'pubsub-js'
import { Snackbar, Alert } from '@mui/material';
import SearchExpenditure from './Components/Non-Page/SearchExpenditure.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.subscriberevent = null;
    this.state = { successAlertMessage: "", open: false, update: false }
  }

  componentDidMount() {
    this.subscriberevent = PubSub.subscribe('SuccessAlert', this.showSnackBar);
  }

  showSnackBar = (msg, data) => {
    this.setState({ ...this.state, successAlertMessage: data, open: true }, () => {
      if (data == "success") {
        this.setState({ ...this.state, update: !this.state.update })
      }
    })

  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <SearchExpenditure />
        <AddExpenditureButton />
        <Expenditures key={this.state.update} />
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert
            severity={this.state.successAlertMessage}
            variant="filled"
            sx={{ minWidth: '400px' }}
          >
            {this.state.successAlertMessage}
          </Alert>
        </Snackbar>
      </div>
    )
  }

}


import * as React from 'react';
import { IconButton, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button, TextField } from '@mui/material';
import PubSub from 'pubsub-js'
import EditIcon from '@mui/icons-material/Edit';
import { SnackBarContext } from './SnackBarContext';

export default function EditExpenditureButton(props) {
    const { transactionID, datetime, receiver, cost } = props
    const [open, setOpen] = React.useState(false);
    const [isPositive, setIsPositive] = React.useState(true)
    const { snackBarDispatch } = React.useContext(SnackBarContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsPositive(true);
    };


    return (
        <React.Fragment>
            <IconButton size="small" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const cost = formJson.cost
                        formJson.transactionID = transactionID
                        if (cost >= 0) {
                            setIsPositive(true)
                            try {
                                const response = await fetch('http://localhost:8090/updateExpenditure', {
                                    method: 'PUT',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(formJson)
                                })
                                if (response.ok) {
                                    snackBarDispatch({ show: "SHOW", type: "SHOW SUCCESS", message: "Successfully Updated" });
                                } else {
                                    snackBarDispatch({ show: "SHOW", type: "SHOW ERROR", message: "Update fails" })
                                }

                            } catch {
                                snackBarDispatch({ show: "SHOW", type: "SHOW ERROR", message: "Update fails" })
                            }
                            handleClose();
                        } else {
                            setIsPositive(false)
                        }




                    },
                }}
            >
                <DialogTitle>Update Expenditure</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update your expenditure, Please change and submit the form below.
                    </DialogContentText>
                    <TextField
                        required
                        margin="normal"
                        id="datetime"
                        name="datetime"
                        label="DateTime"
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        defaultValue={datetime}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    " "
                                ),
                            },
                        }}
                    />
                    <TextField
                        required
                        margin="normal"
                        id="receiver"
                        name="receiver"
                        label="Receiver"
                        type="text"
                        helperText="eg. Alex Chan"
                        fullWidth
                        variant="standard"
                        defaultValue={receiver}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    " "
                                ),
                            },
                        }}
                    />
                    <TextField
                        error={!isPositive}
                        required
                        margin="normal"
                        id="cost"
                        name="cost"
                        label="Cost"
                        type="number"
                        helperText="eg. $100.1"
                        fullWidth
                        variant="standard"
                        defaultValue={cost}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    "$"
                                ),
                            },
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}


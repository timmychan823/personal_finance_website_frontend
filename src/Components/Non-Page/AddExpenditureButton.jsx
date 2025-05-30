import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PubSub from 'pubsub-js'
import { SnackBarContext, SearchBarExpenditureContext, IsLoadingContext } from './Context';

export default function AddExpenditureButton(props) {
    const [open, setOpen] = React.useState(false);
    const [isPositive, setIsPositive] = React.useState(true)
    const { snackBarDispatch } = React.useContext(SnackBarContext)
    const { getData } = React.useContext(SearchBarExpenditureContext)
    const { setIsLoading } = React.useContext(IsLoadingContext)
    const { buttonVariant, buttonSx } = props

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsPositive(true);
    };

    async function postData(url, JSONData) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(JSONData)
            })
            if (response.ok) {
                snackBarDispatch({ show: "SHOW", type: "SHOW SUCCESS", message: "The add operation is successful" });
                if (getData != undefined) {
                    getData();
                }

            } else {
                snackBarDispatch({ show: "SHOW", type: "SHOW ERROR", message: "The add operation fails" });
            }

        } catch (err) {
            snackBarDispatch({ show: "SHOW", type: "SHOW ERROR", message: "The add operation fails" })
            console.log(err)
        }
    }

    return (
        <React.Fragment>
            <Button variant={buttonVariant} sx={{ ...buttonSx }} onClick={handleClickOpen}>
                Add Expenditure
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const cost = formJson.cost
                        if (cost >= 0) {
                            setIsPositive(true)
                            postData('/expenditure', formJson)
                            handleClose();
                        } else {
                            setIsPositive(false)
                        }




                    },
                }}
            >
                <DialogTitle>Add Expenditure</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To record your expenditure, Please fill out the form below.
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
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

AddExpenditureButton.defaultProps = {
    buttonVariant: 'text',
    buttonSx: {}
};

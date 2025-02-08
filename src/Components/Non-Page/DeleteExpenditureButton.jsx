import React, { useContext } from 'react'
import { IconButton, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SnackBarContext } from './SnackBarContext';

//change this 
function DeleteExpenditureButton(props) {
    const [open, setOpen] = React.useState(false);
    const { url, params } = props
    const { snackBarDispatch } = useContext(SnackBarContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton size="small" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();

                        try {
                            const response = await fetch(url + params, {
                                method: "Delete",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })
                            if (response.ok) {
                                snackBarDispatch({ show: "SHOW", type: "SHOW SUCCESS", message: "Successfully deleted" })
                            } else {
                                snackBarDispatch({ show: "SHOW", type: "SHOW ERROR", message: "Some Error Occurs while deleting" })
                            }

                        } catch {
                            snackBarDispatch({ show: "SHOW", type: "SHOW ERROR", message: "Some Error Occurs while deleting" })
                        }
                        handleClose();
                    }




                }
                }
            >
                <DialogTitle>Delete Expenditure</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To delete the expenditure, Please press Delete Button below.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}



export default DeleteExpenditureButton

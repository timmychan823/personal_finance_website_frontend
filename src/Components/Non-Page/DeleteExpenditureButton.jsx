import React from 'react'
import deleteData from '../../helpers/CRUD_data.js'
import { IconButton, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

//change this 
function DeleteExpenditureButton(props) {
    const [open, setOpen] = React.useState(false);
    const { url, params } = props
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
                    onSubmit: (event) => {
                        event.preventDefault();

                        deleteData(url, params)
                        handleClose();



                    },
                }}
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

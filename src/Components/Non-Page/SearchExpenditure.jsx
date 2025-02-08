import React, { useContext } from 'react'
import PubSub from 'pubsub-js'
import { TextField, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SnackBarContext } from './SnackBarContext';

function SearchExpenditure() {

    const [searchQuery, setSearchQuery] = React.useState("")

    const handleTextInputChange = event => {
        setSearchQuery(event.target.value);
    };
    return (
        <React.Fragment>
            <Stack direction="row" spacing={1}>
                <TextField
                    required
                    margin="normal"
                    id="searchExpenditure"
                    name="searchExpenditure"
                    type="text"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                " "
                            ),
                        },
                    }}
                    onChange={handleTextInputChange}
                />
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => { PubSub.publish('SearchQuery', searchQuery.trim()) }}>Search</Button>
            </Stack>
        </React.Fragment>


    )
}


export default SearchExpenditure

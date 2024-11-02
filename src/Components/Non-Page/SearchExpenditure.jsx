import React from 'react'
import PubSub from 'pubsub-js'
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function SearchExpenditure() {

    const [searchQuery, setSearchQuery] = React.useState("")
    const handleTextInputChange = event => {
        setSearchQuery(event.target.value);
    };
    return (
        <React.Fragment>
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
        </React.Fragment>


    )
}


export default SearchExpenditure

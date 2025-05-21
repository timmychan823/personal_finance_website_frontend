import React, { useContext } from 'react'
import PubSub from 'pubsub-js'
import { TextField, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SnackBarContext } from './Context';

function SearchExpenditure(props) {
    const { search, setSearch } = props
    const { expendituresList, setExpendituresList } = props

    const handleTextInputChange = event => {
        setSearch({ ...search, searchQuery: event.target.value });
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
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => { search.searchQuery.trim() }}>Search</Button>
            </Stack>
        </React.Fragment>


    )
}


export default SearchExpenditure

import React, { useContext } from 'react'
import PubSub from 'pubsub-js'
import { TextField, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
<<<<<<< HEAD
import { SnackBarContext } from './Context';

function SearchExpenditure(props) {
    const { search, setSearch } = props
    const { expendituresList, setExpendituresList } = props

    const handleTextInputChange = event => {
        setSearch({ ...search, searchQuery: event.target.value });
=======
import { SnackBarContext } from './SnackBarContext';

function SearchExpenditure() {

    const [searchQuery, setSearchQuery] = React.useState("")

    const handleTextInputChange = event => {
        setSearchQuery(event.target.value);
>>>>>>> c81439c75d229ced839b60e466e373cd926236bc
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
<<<<<<< HEAD
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => { search.searchQuery.trim() }}>Search</Button>
=======
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => { PubSub.publish('SearchQuery', searchQuery.trim()) }}>Search</Button>
>>>>>>> c81439c75d229ced839b60e466e373cd926236bc
            </Stack>
        </React.Fragment>


    )
}


export default SearchExpenditure

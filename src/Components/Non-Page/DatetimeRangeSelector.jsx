import React from 'react'
import { TextField, Stack } from '@mui/material'

function DatetimeRangeSelector(props) {
    const { search, setSearch } = props
    const { expendituresList, setExpendituresList } = props

    return (
        <React.Fragment>

            <Stack direction="row" spacing={2}>
                <TextField
                    margin="normal"
                    id="datetime"
                    name="datetime"
                    label="Start Time"
                    type="datetime-local"
                    variant="standard"
                    defaultValue={new Date(0).toISOString().slice(0, 16)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                " "
                            ),
                        },
                    }} />
                <TextField
                    margin="normal"
                    id="datetime"
                    name="datetime"
                    label="End Time"
                    type="datetime-local"
                    variant="standard"
                    defaultValue={new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                " "
                            ),
                        },
                    }} />
            </Stack>


        </React.Fragment>
    )
}

export default DatetimeRangeSelector
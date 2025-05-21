import { useState, useContext, useEffect } from 'react'
import { SnackBarContext, IsLoadingContext } from '../Non-Page/Context'
import { Stack, Button, Typography, Alert } from '@mui/material'
import AddExpenditureButton from '../Non-Page/AddExpenditureButton'
function RemindersPage() {
    const { snackBarDispatch } = useContext(SnackBarContext)
    const { setIsLoading } = useContext(IsLoadingContext)
    const [remindersList, setRemindersList] = useState([{ id: 1, summary: "Hello", datetime: new Date("2025-02-10") }, { id: 2, summary: "Hello2", datetime: new Date("2025-03-08") }, { id: 3, summary: "Hello3", datetime: new Date("2025-03-20") }])

    useEffect(() => {
        setIsLoading(false)
    }, [])

    function addHoursToDate(objDate, intHours) {
        var numberOfMlSeconds = objDate.getTime();
        var addMlSeconds = (intHours * 60) * 60 * 1000;
        var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
        return newDateObj;
    }

    function determineUrgency(datetime) {
        const currentTime = new Date()
        if (addHoursToDate(currentTime, 7 * 24) >= datetime) {
            return "error"
        } else if (addHoursToDate(currentTime, 28 * 24) >= datetime) {
            return "warning"
        } else {
            return "info"
        }
    }

    return (
        <>
            <Stack direction="column" spacing="10px">
                <Stack direction="row">
                    <Typography variant="h3" sx={{ flexGrow: 1 }}>Reminders</Typography>
                    <Button variant='contained'>Add New Reminder</Button>
                </Stack>
                <Stack direction="column" spacing="10px">
                    {remindersList.map((reminder) => <Alert id={reminder.id} variant="filled" severity="info" color={determineUrgency(reminder.datetime)}><Typography variant="h6">{reminder.summary}</Typography><Typography>{reminder.datetime.toString()}</Typography><Stack direction="row" spacing={2}><Button variant='contained' sx={{ backgroundColor: "green" }}>Add Income</Button><AddExpenditureButton buttonVariant='contained' buttonSx={{ backgroundColor: "red" }}>Add Expenditure</AddExpenditureButton></Stack></Alert>)}

                </Stack>

            </Stack >



        </>
    )
}

export default RemindersPage
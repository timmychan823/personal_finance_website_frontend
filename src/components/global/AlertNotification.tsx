import { useAlertContext } from "contexts/alert";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { flushSync } from 'react-dom';

export default function AlertNotification(){
    // useContext
    const { severity, alertMessage, setSeverity, setAlertMessage} = useAlertContext();
    const handleClose = ()=>{
        flushSync(() => {
            setSeverity(null);
        });
        flushSync(() => {
            setAlertMessage("");
        });
    }

    return (
        severity!==null&&<Snackbar open={severity!==null} autoHideDuration={6000} onClose={handleClose} sx={{maxWidth: 500, minWidth: 500, maxHeight: 200, minHeight: 200, overflow: "clip", position: "fixed",  top: 20, right: 20}}>
            <Alert
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    )
}

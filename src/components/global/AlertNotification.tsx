import { useAlertContext } from "contexts/alert";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { flushSync } from "react-dom";

export default function AlertNotification() {
  // useContext
  const { severity, message, alertDispatch } = useAlertContext();
  const handleClose = () => {
    alertDispatch({ type: 'setNull', message: null })
  };

  return (
    severity !== null && (
      <Snackbar
        open={severity !== null}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{
          maxWidth: 500,
          minWidth: 500,
          maxHeight: 200,
          minHeight: 200,
          overflow: "clip",
          position: "fixed",
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    )
  );
}

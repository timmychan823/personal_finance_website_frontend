import AlertContext, { useAlertContextState } from 'contexts/alert'
import { Outlet } from 'react-router-dom'
import AlertNotification from 'components/global/AlertNotification'

const BasePageWrapper = () => {
    const alertState = useAlertContextState();
    
    return (
        <AlertContext.Provider value={alertState}>
            <AlertNotification/>
            <Outlet/>
        </AlertContext.Provider>
    )
}

export default BasePageWrapper


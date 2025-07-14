import {
    createContext,
    useContext,
    useState
} from 'react'
import { EMPTY_VOID } from 'types';
import { Severity } from 'types/alert/interfaces';

export interface IAlertContext {
    severity: Severity|null;
    alertMessage: string|null;
    setSeverity: (newSeverity:Severity)=>void;
    setAlertMessage: (newAlertMessage: string)=>void;
}

export function useAlertContextState(): IAlertContext {
    const [severity, setSeverity] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    return {severity, setSeverity, alertMessage, setAlertMessage}
}

export const AlertContext = createContext<IAlertContext>({
    // getter
    severity: null,
    setSeverity: EMPTY_VOID as (newSeverity:Severity)=>void,
    alertMessage: null,
    setAlertMessage: EMPTY_VOID as (newAlertMessage: string)=>void,
})

export const useAlertContext = () => useContext(AlertContext)
export default AlertContext

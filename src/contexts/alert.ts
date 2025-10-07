import { createContext, useContext, useState, Reducer, Dispatch, useReducer } from "react";
import { EMPTY_VOID } from "types";
import { Severity } from "types/alert/interfaces";

type ActionText = 'setSuccess' | 'setInfo' | 'setWarning' | 'setError' | 'setNull'

interface State {
  severity?: Severity
  message?: string
}

interface Action {
  type: ActionText
  message: string
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setSuccess': {
      return {
        ...state,
        severity: 'success',
        message: action.message
      }
    }
    case 'setInfo': {
      return {
        ...state,
        severity: 'info',
        message: action.message
      }
    }
    case 'setWarning': {
      return {
        ...state,
        severity: 'warning',
        message: action.message
      }
    }
    case 'setError': {
      return {
        ...state,
        severity: 'error',
        message: action.message
      }
    }
    case 'setNull': {
      return {
        ...state,
        severity: null,
        message: null
      }
    }
  }
}

export interface IAlertContext {
  severity: Severity | null;
  message: string | null;
  alertDispatch: Dispatch<Action>;
}

export function useAlertContextState(): IAlertContext {
  const [{ severity, message }, dispatch] = useReducer(reducer, {
    severity: null,
    message: null
  })
  return { severity, message, alertDispatch: dispatch }
}

export const AlertContext = createContext<IAlertContext>({
  severity: null,
  message: null,
  alertDispatch: EMPTY_VOID as unknown as Dispatch<Action>,
});

export const useAlertContext = () => useContext(AlertContext);
export default AlertContext;

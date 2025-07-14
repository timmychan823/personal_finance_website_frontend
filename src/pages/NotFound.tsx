import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useErrorContext } from "contexts/error";

interface IProps {
  redirect: string;
  error?: string;
}

export const NotFound: FC<IProps> = ({ redirect, error = "not_found" }) => {
  // const { errorDispatch } = useErrorContext()

  // useEffect(
  //     () => errorDispatch({ type: 'setError', error: { message: error } }),
  //     []
  // )

  return <Navigate to={redirect} replace />;
};
export default NotFound;

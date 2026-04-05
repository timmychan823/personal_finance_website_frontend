import { FC } from "react";
import { Navigate } from "react-router-dom";

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

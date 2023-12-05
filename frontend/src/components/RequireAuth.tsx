import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export const RequireAuth = () => {
  const { user } = useAppSelector(state => state.user);
  const location = useLocation();

  return (
    !!user
      ? <Outlet />
      : <Navigate to='/auth' state={{ from: location }} replace />
  );
};

import { Navigate, useLocation } from "react-router-dom";
import { AppRouter, pages } from "./router"
import { useGetUserQuery } from "./features/auth";
import { Loader } from "./components/common";

export const App = () => {
  const location = useLocation();
  const { data: user, isFetching } = useGetUserQuery({});

  if (isFetching) {
    return <Loader />
  }

  if (!user && location.pathname !== pages.LOGIN.path) {
    return <Navigate to="/auth" />
  }

  if (user && location.pathname === pages.LOGIN.path) {
    return <Navigate to="/dashboard" />
  }

  return <AppRouter />
}
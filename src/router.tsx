import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage, DashboardPage } from "./components/pages";
import { useMemo } from "react";

export const AppRouter = () => {
  const extractedPages = useMemo(() => Object.entries(pages).map(([_, pageDetails]) => pageDetails), []);

  return (
    <Routes>
      {extractedPages.map(({ path, Component }) => <Route key={path} path={path} Component={Component} />)}
    </Routes>
  )
}

export const pages = {
  Home: { path: "/", Component: () => <Navigate to="/dashboard" /> },
  LOGIN: { path: "/auth", Component: AuthPage },
  DASHBOARD: { path: "/dashboard", Component: DashboardPage },
}
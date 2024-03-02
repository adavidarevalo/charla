import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";

 const HomePage = React.lazy(() => import("../pages/home"))

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
])

export default router

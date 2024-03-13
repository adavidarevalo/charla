import React from "react";
import PageNotFound from "../pages/page_not_found";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import SignUpPage from "../pages/sign_up";
import SignInPage from "../pages/sign_in";

 const ChatPage = React.lazy(() => import("../pages/chat"))

const MainRoutes = () => {
  const { user: {token} } = useSelector((state: AppState) => state.user)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-in"
          element={token ? <Navigate to={'/'} /> : <SignInPage />}
        />
        <Route
          path="/sign-up"
          element={token ? <Navigate to={'/'} /> : <SignUpPage />}
        />
        <Route
          path="/"
          element={token ? <ChatPage /> : <Navigate to={'/sign-in'} />}
        />
       
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
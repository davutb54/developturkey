import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import RegisterPage from "../pages/RegisterPage";
import SignInPage from "../pages/SignInPage";
import UserPage from "../pages/UserPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProblemDetails from "../pages/ProblemDetails";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import MyProfilePage from "../pages/MyProfilePage";
import { GlobalContext } from "../context/GlobalState";
import NotFoundPage from "../pages/NotFoundPage";

export default function MainLayout() {
  const {isAuthenticated} = useContext(GlobalContext)

  return (
    <div className="Main">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/categories/" element={<CategoriesPage />} />
        <Route path="/problem/:problemId" element={<ProblemDetails />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="aboutus" element={<AboutUsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        {isAuthenticated && (
          <Route path="/myprofile" element={<MyProfilePage />} />
        )}
      </Routes>
    </div>
  );
}

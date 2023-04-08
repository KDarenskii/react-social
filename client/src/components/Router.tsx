import React from "react";
import { Routes, Route } from "react-router-dom";
import { NEWS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../constants/routesPathnames";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import NewsPage from "../pages/NewsPage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={NEWS_ROUTE.PATH} element={<MainLayout />}>
                <Route index element={<NewsPage />} />
            </Route>
            <Route path={LOGIN_ROUTE.PATH} element={<LoginPage />} />
            <Route path={REGISTRATION_ROUTE.PATH} element={<RegistrationPage />} />
        </Routes>
    );
};

export default Router;

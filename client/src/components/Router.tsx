import React from "react";
import { Routes, Route } from "react-router-dom";
import { NEWS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MESSENGER_ROUTE } from "../constants/routesPathnames";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import NewsPage from "../pages/NewsPage";
import MessangerPage from "../pages/MessangerPage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={MESSENGER_ROUTE.PATH} element={<MainLayout />}>
                <Route index element={<MessangerPage />} />
                <Route path={NEWS_ROUTE.PATH} element={<NewsPage />} />
            </Route>
            <Route path={LOGIN_ROUTE.PATH} element={<LoginPage />} />
            <Route path={REGISTRATION_ROUTE.PATH} element={<RegistrationPage />} />
        </Routes>
    );
};

export default Router;

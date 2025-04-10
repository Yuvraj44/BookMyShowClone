import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MoviePage from "./Pages/MoviePage";
import SlotPage from "./Pages/SlotPage";
import LogInPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";
import Ticket from "./Componants/Ticket";
import HistoryPage from "./Pages/HistoryPage";
import ProfilePage from "./Pages/ProfilePage";
import CreateMoviePage from "./Pages/CreateMoviePage"
import EditMoviePage from "./Pages/EditMoviePage";
import UserAdminPage from "./Pages/UserAdminPage";
import EditSlot from "./Componants/EditSlot";
import EditSlotPage from "./Pages/EditSlotPage";
import ErrorPage from "./Pages/ErrorPage"
const CustomerRoutes = () => {


    return (
        <Routes>
            <Route path="/" element={<LogInPage/>} />
            <Route path="/api/register" element={<RegisterPage />} />
            <Route path="/api/home" element={<HomePage />} />
            <Route path="/api/movies" element={<MoviePage />} />
            <Route path="/api/movies/:id" element={<SlotPage />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/api/logout" element={<LogInPage />} /> 
            <Route path="/api/booking" element={<HistoryPage />} /> 
            <Route path="/api/profile" element={<ProfilePage />} /> 
            <Route path="/api/movie/create" element={<CreateMoviePage />} /> 
            <Route path="/api/movie/edit" element={<EditMoviePage />} /> 
            <Route path="/api/user" element={<UserAdminPage />} /> 
            <Route path="/edit-slots/:id" element={<EditSlotPage />} />

            <Route path="*" element={<ErrorPage/>} /> 
        </Routes>
    );
};


export default CustomerRoutes;

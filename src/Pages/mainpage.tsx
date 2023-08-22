import React from "react";
import {supabase} from "../api/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Carbonsurvey from "./carbonsurvey";
import Map from "./map";
import Notifications from "./notifications";

export default function Mainpage() {
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }
    const handleSignOut = () => {
        signOut();
    }
    return (
        <div className={
            "h-screen bg-loginClimate bg-cover bg-no-repeat overflow-y-auto flex flex-col justify-center items-center"
            }
        >
        <div className={
            "top-0 w-full h-2 bg-green-600 bg-opacity-90 rounded"
            }
            >
            </div>
        <div className={
            "w-full h-16 bg-neutral-100 flex bg-opacity-80"
        }>
            <BrowserRouter>
            <div className="m-6 transition delay-100 duration-300 hover:text-green-500">
                <NavLink to="/" className={""}>
                    Home
                </NavLink>
            </div>
            <div className="m-6 transition delay-100 duration-300 hover:text-green-500">
                <NavLink to="/Pages/carbonsurvey" className={""}>
                    Carbon Survey
                </NavLink>
            </div>
            <div className="m-6 transition delay-100 duration-300 hover:text-green-500">
                <NavLink to="/Pages/notifications" className={""}>
                    Notification Settings
                </NavLink>
            </div>
            <div className="m-6 transition delay-100 duration-300 hover:text-green-500">
                <NavLink to="/Pages/map" className={""}>
                    Map
                </NavLink>
            </div>
            <Routes>
                <Route path = "/Pages/carbonsurvey" element = {<Carbonsurvey/>} />
                <Route path = "/Pages/notifications" element = {<Notifications/>}/>
                <Route path = "/Pages/map" element = {<Map/>}/>
            </Routes>
            </BrowserRouter>
            <div className="text-slate-700 transition delay-25 duration-300 hover:text-white">
            <div className="absolute right-12 top-7 font-serif text-sm border-1 border-slate-500 rounded py-1 px-2 scale-125 transition delay-25 duration-300 hover:bg-slate-700">
                <button onClick={signOut}>
                    Sign out
                </button>
            </div>
            </div>
        </div>
        <div className="w-full h-full bg-loginColor bg-opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center"></div>
        </div>
    );
}
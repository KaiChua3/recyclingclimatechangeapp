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
    const climatiq = fetch("./climatiq.json")
    .then(resp => resp.json()).then();
    const fetchRes = fetch(
        'https://beta4.api.climatiq.io/estimate' , {
            method: 'POST',
            body: JSON.stringify(
                {
                emission_factor: {
                    id: "da80d5f9-7fb2-4cd7-aa45-781479499845"
                },
                parameters: {
                    energy: 900,
                    energy_unit: "kWh"
                }
            }),
            headers: {
                'Authorization': 'Bearer G3FQHS5WVC4H1EP2D6ETNEGK4AFM'
            }
        })
    .then(response => response.json())
    .then(d => {console.log(d)});
    return (
        <div className={
            "h-screen bg-loginClimate bg-cover bg-no-repeat"
            }
        >
        <div className={
            "top-0 w-full h-8 bg-black"
            }
            ></div>
        <div className={
            "w-full h-16 bg-white flex"
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
            </BrowserRouter>
            <div className="text-slate-700 transition delay-150 duration-300 hover:text-white">
            <div className="absolute right-12 top-12 border-1 border-slate-500 rounded py-1 px-2 scale-125 transition delay-150 duration-300 hover:bg-slate-700">
                <button onClick={signOut}>
                    Sign out
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}
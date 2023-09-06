import React, { useState } from "react";
import {supabase} from "../api/client";
import { Routes, Route, NavLink} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { Bar } from 'react-chartjs-2';
import Carbonsurvey from "./carbonsurvey";
import Map from "./map";
import Notifications from "./notifications";

export default function Mainpage() {
    const [footprint, setFootprint] = useState<number[]>([]);
    const [currentLocation, setLocation] = useState(true);
    useEffect(() => {
        const getTableData = async() => {
            const { data, error } = await supabase
            .from('SurveyList')
            .select('footprint')
            if (error) {
                console.log(error);
            }
            if (data) {
                setFootprint(data.map(row => row.footprint).reverse());
            };
        }
        getTableData();
    }, [])
    const options = {
        responsive: true,
        plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Your Carbon Footprint',
        },
        },
    }
    const labels = ['Today','1 day ago','2 days ago','3 days ago','4 days ago','5 days ago'];
    const data = {
        labels,
        datasets: [
            {
                label:'Carbon Footprint kg/co2e',
                data: labels.map((item, index) => footprint[index]),
                backgroundColor: 'rgba(232,71,22)',
            }
        ],
    }
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }
    const handleSignOut = () => {
        signOut();
    }
    const location = useLocation();
    useEffect(() => {
        if (location.pathname == "/") {
            setLocation(true);
        } else {
            setLocation(false);
        }
    },[location]);
    function MainpageGraph() {
        if (currentLocation == true) {
            return(
                <div className="absolute top-60">
                <div className="text-zinc-300 text-3xl font-bold font-mono">
                    Carbon Footprint Graph
                </div>
                <div className="h-20"></div>
                <Bar options={options} data={data} height="300px"/>
                </div>
            );
        } else {
            return(
                <div>
                </div>
            );

        }
    }
    return (
        <div>
        <div className="h-screen bg-loginClimate bg-cover bg-no-repeat overflow-y-auto flex flex-col justify-center items-center">
        <div className={
            "top-0 w-full h-2 bg-green-600 bg-opacity-90 rounded"
            }
            >
        </div>
        <div className={
            "w-full h-16 bg-neutral-100 flex bg-opacity-80"
        }>
            <div className="m-6 transition delay-100 duration-300 hover:text-green-500">
                <NavLink to="/" className={"font-serif"}>
                    Home
                </NavLink>
            </div>
            <div className="m-6 transition delay-100 duration-300 hover:text-green-500">
                <NavLink to="/Pages/carbonsurvey" className={"font-serif"}>
                    Carbon Survey
                </NavLink>
            </div>
            <div className="m-6 transition delay-100 duration-300 hover:text-green-500">
                <NavLink to="/Pages/notifications" className={"font-serif"}>
                    Notification Settings
                </NavLink>
            </div>
            <div className="m-6 transition delay-100 duration-300 hover:text-green-500">
                <NavLink to="/Pages/map" className={"font-serif"}>
                    Map
                </NavLink>
            </div>
            <Routes>
                <Route path = "/Pages/carbonsurvey" element = {<Carbonsurvey/>} />
                <Route path = "/Pages/notifications" element = {<Notifications/>}/>
                <Route path = "/Pages/map" element = {<Map/>}/>
            </Routes>
            <div className="text-slate-700 transition delay-25 duration-300 hover:text-white">
            <div className="absolute right-12 top-7 font-serif text-sm border-1 border-slate-500 rounded py-1 px-2 scale-125 transition delay-25 duration-300 hover:bg-slate-700">
                <button onClick={signOut}>
                    Sign out
                </button>
            </div>
            </div>
        </div>
        <div className="w-full h-full bg-loginColor bg-opacity-95 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center">
           <MainpageGraph/>
        </div>
        </div>
        <div>
            <div className="relative h-screen bg-burningEarth bg-cover bg-no-repeat flex flex-col justify-center items-center">
                <div className="static w-full h-full bg-loginColor bg-opacity-95 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center">
                    <div className="absolute top-60 text-zinc-300 font-bold font-mono">
                        What is the purpose of this app?
                    </div>
                    <div className="absolute top-72 text-zinc-300 text-center font-sans italic">
                        <p className="w-96">It is expected that by 2050, parts of the Earth's landmass containing 150 million in population as of the present day will be underwater. This means many cities like New York City, Miami, Tokyo, Shanghai, and many other cities are at risk of sinking below the waterline. In the Bay Area, the frequency and intensity of floods will increase dramitcally, and droughts and wildfires will become more common. While the majority of the population might feel despair in the face of such a crisis, it is important to recognize the problem and work together to solve it. *Name of app* seeks to help in this endeavour by allowing the everyday person contribute to solving this crisis. *Name of app* allows users to take action against climate change by giving them the tools to take charge of their impact on the environment, with a carbon footprint tracker, daily notifications containing tips on how to lower your impact on the environment, a map to find your closest recycling center, and other useful day-to-day features people would use.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
import {supabase} from "../api/client";
import React, { useState } from "react";
import OneSignal from "react-onesignal";
import { useEffect } from 'react';

export default function Notifications() {
    useEffect(() => {
        getTypeData();
        getContentData();
        getEmailData();
        getEnergyData();
        getWaterData();
        getDisasterData();
        getFunFactsData();
        getFoodData();
    },[]);
    useEffect(() => {
        OneSignal.init({ 
            appId: '0ad65017-bcc8-4576-9a6f-422c9201a4a3', allowLocalhostAsSecureOrigin: true
        })
    },[]);
    const [email, setEmail] = useState('');
    const [energy, setEnergy] = useState(false);
    const [water, setWater] = useState(false);
    const [disasters, setDisasters] = useState(false);
    const [funFacts, setFunFacts] = useState(false);
    const [food, setFood] = useState(false);
    const [typeData, getType] = useState(['']);
    const [contentData, getContent] = useState(['']);
    const [emailData, getEmail] = useState(['']);
    const [energyData, getEnergy] = useState<boolean[]>([]);
    const [waterData, getWater] = useState<boolean[]>([]);
    const [disastersData, getDisasters] = useState<boolean[]>([]);
    const [funFactsData, getFunFacts] = useState<boolean[]>([]);
    const [foodData, getFood] = useState<boolean[]>([]);
    const addToTables = async(email: any, energyType: boolean, waterType: boolean, disastersType: boolean, factsType: boolean, foodType: boolean) => {
        const { error } = await supabase
        .from('Notifications List')
        .insert({email: email, energyNews: energyType, waterNews: waterType, naturalDisastersNews: disastersType, funFactsNews: factsType, foodNews: foodType})
        if (error) {
            console.log(JSON.stringify(error));
        }
    }
    const getTypeData = async() => {
        const { data, error } = await supabase
        .from('TypeOfNewsList')
        .select('notificationType')
        if (error) {
            console.log(error);
        }
        if (data) {
            getType(data.map(row => row.notificationType));
        };
    }
    const getContentData = async() => {
        const { data, error } = await supabase
        .from('TypeOfNewsList')
        .select('notificationContent')
        if (error) {
            console.log(error);
        }
        if (data) {
            getContent(data.map(row => row.notificationContent));
        };
    }
    const getEmailData = async() => {
        const { data, error } = await supabase
        .from('Notifications List')
        .select('email')
        if (error) {
            console.log(error);
        }
        if (data) {
            getEmail(data.map(row => row.email));
        };
    }
    const getEnergyData = async() => {
        const { data, error } = await supabase
        .from('Notifications List')
        .select('energyNews')
        if (error) {
            console.log(error);
        }
        if (data) {
            getEnergy(data.map(row => row.energyNews));
        };
    }
    const getWaterData = async() => {
        const { data, error } = await supabase
        .from('Notifications List')
        .select('waterNews')
        if (error) {
            console.log(error);
        }
        if (data) {
            getWater(data.map(row => row.waterNews));
        };
    }
    const getDisasterData = async() => {
        const { data, error } = await supabase
        .from('Notifications List')
        .select('naturalDisastersNews')
        if (error) {
            console.log(error);
        }
        if (data) {
            getDisasters(data.map(row => row.naturalDisastersNews));
        };
    }
    const getFunFactsData = async() => {
        const { data, error } = await supabase
        .from('Notifications List')
        .select('funFactsNews')
        if (error) {
            console.log(error);
        }
        if (data) {
            getFunFacts(data.map(row => row.funFactsNews));
        };
    }
    const getFoodData = async() => {
        const { data, error } = await supabase
        .from('Notifications List')
        .select('foodNews')
        if (error) {
            console.log(error);
        }
        if (data) {
            getFood(data.map(row => row.foodNews));
        };
    }
    const handleEnergy = () => {
        setEnergy(!energy);
    }
    const handleWater = () => {
        setWater(!water);
    }
    const handleDisasters = () => {
        setDisasters(!disasters);
    }
    const handleFacts = () => {
        setFunFacts(!funFacts);
    }
    const handleFood = () => {
        setFood(!food);
    }
    const handleSubmit = () => {
        if (email == '') {
            alert("Enter a valid email!")
        } else {
        console.log(email + " " + energy + " " + water + " " + disasters + " " + funFacts + " " + food);
        addToTables(email, energy, water, disasters, funFacts, food);
        }
    }
    return(
        <div className="absolute inset-x-0 top-36 flex justify-center items-center">
            <div>
                <h1 className="text-zinc-300 text-3xl font-mono font-bold">
                    Notifications Settings
                </h1>
                <div className="h-8"></div>
                <div className="flex justify-center">
                    <p className={
                        "text-center text-zinc-300 w-96"
                    }>
                        If you sign up for notifications, we will send daily notifications regarding information on how to reduce your impact on climate change, with a combination of fun facts, useful information, and other information to help you save the environment!
                    </p>
                </div>
                
                <div>            
                    <label className="h-16 flex text-gray-200 justify-center items-end">What is your email?</label>
                    <div className="flex rounded justify-center items-center">
                        <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={"bg-slate-600 text-zinc-300 rounded border-2 border-slate-500"}
                        >

                        </input>
                    </div>
                </div>
                <div>            
                    <label className="h-16 flex text-gray-200 justify-center items-end">What type of news would you like to receive?</label>
                    <div className="flex rounded justify-center items-center">
                        <div>
                            <div>
                                <div>
                                    <input
                                    type="checkbox"
                                    checked={energy}
                                    onChange={handleEnergy}
                                    >
                                    </input>
                                    <label className="text-zinc-300"> Energy</label>
                                </div>
                                <div>
                                    <input
                                    type="checkbox"
                                    checked={water}
                                    onChange={handleWater}
                                    >
                                    </input>
                                <label className="text-zinc-300"> Water</label>
                                </div>
                                <div>
                                    <input
                                    type="checkbox"
                                    checked={disasters}
                                    onChange={handleDisasters}
                                    >
                                    </input>
                                <label className="text-zinc-300"> Natural Disasters</label>
                                </div>
                                <div>
                                    <input
                                    type="checkbox"
                                    checked={funFacts}
                                    onChange={handleFacts}
                                    >
                                    </input>
                                <label className="text-zinc-300"> Fun Facts</label>
                                </div>
                                <div>
                                    <input
                                    type="checkbox"
                                    checked={food}
                                    onChange={handleFood}
                                    >
                                    </input>
                                <label className="text-zinc-300"> Food Production</label>
                                </div>
                                <div className="h-16"></div>
                            </div>
                            <button 
                            onClick={handleSubmit}
                            className={
                                "w-20 h-10 flex rounded bg-slate-700 border-slate-500 border-2 text-white justify-center items-center hover:scale-125"
                            }>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
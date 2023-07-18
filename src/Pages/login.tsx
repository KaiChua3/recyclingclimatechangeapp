import React from 'react';
import ReactDOM from 'react-dom/client';
import "./login.css";
import {supabase} from "../api/client";
import { useState } from 'react';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInWithEmail = async(checkEmail: any, checkPassword: any) => {
      const { data, error } = await supabase.auth.signInWithPassword({
      email: checkEmail,
      password: checkPassword,
      })
      if (error) {
        alert("Oops! Looks like either your account/password is incorrect or your account doesn't exist!");
      }
    }

    async function signOut() {
    const { error } = await supabase.auth.signOut()
    }

    async function signUp(accountEmail: any, accountPassword: any) {
    const { data, error } = await supabase.auth.signUp({
    email: accountEmail,
    password: accountPassword,
    })
    if (error) {
      alert("It looks like either this email is already registered to another account!");
    }
    }
    const handleSubmit = () => {
      signInWithEmail(email,password);
    }
    const handleSignUp = () => {
      signUp(email,password);
    }
    return (
      <div
        className={
          "h-screen flex flex-col justify-center items-center"
        }
      >
        <h1 
          className={
            "font-bold text-center text-4xl text-green-600"
          }
        >
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div
          className=""
          >
          <label
          className="font-medium text-lg">
            Email:
            <input
            className="bg-gray-100 border py-1 px-3 mr-3 rounded mb-2 w-full"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          </div>
          <div
          className=""
          >
          <label
          className="font-medium text-lg">
            Password:
            <input
            className={"bg-gray-100 border py-1 px-3 mr-3 rounded mb-2 w-full"}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          </div>
          <input type="submit" className="w-full mt-4"/>
        </form>
        <button onClick={handleSignUp} className="w-full mt-4">Sign up</button>
        
      </div>
    );
}

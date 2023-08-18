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
          "h-screen bg-loginClimate bg-cover bg-no-repeat flex flex-col justify-center items-center"
        }
      >
        <div className="w-full h-full bg-loginColor rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
        <h1 
          className={
            "font-bold text-center text-4xl text-green-600"
          }
        >
          Login
        </h1>
          <div
          className=""
          >
          <label
          className="font-bold font-serif text-lg text-white">
            Email:
            <input
            className="bg-gray-100 text-black border-blue-400 border-4 border py-1 px-3 mr-3 rounded mb-2 w-full"
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
          className="font-bold font-serif text-lg text-white">
            Password:
            <input
            className={"bg-gray-100 text-black border-blue-400 border-4 border py-1 px-3 mr-3 rounded mb-2 w-full"}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          </div>
          <button onClick={handleSubmit} className="w-40 mt-4 text-white font-bold bg-blue-900	border-b-4 border-slate-500 rounded hover:scale-125">
            Sign in
          </button>
        <button onClick={handleSignUp} className="w-40 mt-4 text-white font-bold bg-blue-900	border-b-4 border-slate-500 rounded hover:scale-125">
          Sign up
        </button>
        </div>
        </div>
    );
}

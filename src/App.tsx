import "./App.css";
import { supabase } from './api/client';
import Auth from "./Pages/login";
import Mainpage from "./Pages/mainpage";
import { useState, useEffect} from "react";


function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function pullUser() {
      const { data: { user } } = await supabase.auth.getUser();
    }
    async function pullSession() {
      const { data, error } = await supabase.auth.getSession();
      console.log("Session: " + data);
    }
    supabase.auth.onAuthStateChange((event,session) => {
      const currentUser = pullUser();
      if (event != 'INITIAL_SESSION') {
        setUser(currentUser as any ?? null);
      }
      if (event == 'SIGNED_OUT') {
        setUser(false as any);
      }
    })
  }, [user]);
  return (
    <div>
      {!user ? <Auth/> : <Mainpage/>}
    </div>
  );
}

export default App;
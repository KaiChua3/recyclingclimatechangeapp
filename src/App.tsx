import "./App.css";
import { supabase } from './api/client';
import Auth from "./Pages/login";
import mainpage from "./Pages/mainpage";
import notifications from "./Pages/notifications";

function App() {
    return (
      <Auth/>
    );
}

export default App;

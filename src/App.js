import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Partner from './pages/Partner';
import Tips from "./pages/Tips";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../src/firebase';
import { useEffect, useState } from "react";




function App() {
  const auth = getAuth(app);
  const [logedin, setlogedin] = useState(false);
  useEffect(() => {
    const get_login_user = async() =>{
      onAuthStateChanged(auth, (user) => {
        
      if (user) {
       setlogedin(true)
      } else {
        setlogedin(false)
      }
    
  });
    }
    get_login_user()
  }, []);
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={logedin ?<Home/> : <Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/partner" element={<Partner/>} />
        <Route path="/tips" element={<Tips/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
       
      </Routes>
    
   </BrowserRouter>
  );
}

export default App;

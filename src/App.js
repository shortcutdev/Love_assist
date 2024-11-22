import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Partner from './pages/Partner';
import UTips from "./pages/UTips";
import ULettes from "./pages/ULettes";
import UImpress from "./pages/UImpress";
import UPoem from "./pages/UPoem";
import UCatchLines from "./pages/UCatchLines";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../src/firebase';
import { useEffect, useState } from "react";
import TExpressFeelings from "./pages/TExpressFeelings";
import TShowLoyalty from "./pages/TShowLoyalty";
import TRandomLoveTips from "./pages/TRandomLoveTips";
import NSavedLetters from "./pages/NSavedLetters";
import NSavedPoems from "./pages/NSavedPoems";





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
        <Route path="/tips" element={<UTips/>} />
        <Route path="/impress" element={<UImpress/>} />
        <Route path="/poem" element={<UPoem/>} />
        <Route path="/randomLoveTips" element={<TRandomLoveTips/>} />
        <Route path="/showLoyalty" element={<TShowLoyalty/>} />
        <Route path="/expressFeelings" element={<TExpressFeelings/>} />
        <Route path="/savedLetters" element={<NSavedLetters/>} />
        <Route path="/savedPoem" element={<NSavedPoems/>} />
        <Route path="/catchlines" element={<UCatchLines/>} />
        <Route path="/letters" element={<ULettes/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
       
      </Routes>
    
   </BrowserRouter>
  );
}

export default App;

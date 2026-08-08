import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "./components/test";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/admin/adminPage";
import { Toaster } from "react-hot-toast";
import TestPage from "./pages/test";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/forgetPasswordPage";

//154113421916-i6gf49q2f523at1apqjg16bjsmvcuvr6.apps.googleusercontent.com

function App() {
  return(
    <GoogleOAuthProvider clientId="154113421916-i6gf49q2f523at1apqjg16bjsmvcuvr6.apps.googleusercontent.com" >
    <BrowserRouter>
    <Toaster position="top-right"/>
    <div  className="w-full h-screen">

      <Routes path="/">
      <Route path="/*" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/admin/*" element={<AdminPage/>}/>
      <Route path="/test/*" element={<TestPage/>}/>
      <Route path="/forgot-password" element={<ForgetPasswordPage/>}></Route>
      

      </Routes>

      
    </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
    
    
  );
}

export default App;
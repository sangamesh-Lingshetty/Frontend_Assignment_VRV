import React,{useState} from "react";
import "./index.css";
import DashBoard from "./Components/DashBoard";
import {Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Components/User";
import Layout from "./Components/Layout";
import Role from "./Components/Role";
import Permission from "./Components/Permission";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./Components/AdminLogin";
import RefreshHandler from "./Components/RefreshHandler";
export default function App() {

  const [isAuthenticated,setidAuthenticated]= useState(false);
  const PrivateRoute = ({element})=>{
    return isAuthenticated? element: <Navigate to="/"/>
  }
  return (
    <>
      <Router>
      <RefreshHandler setidAuthenticated={setidAuthenticated} />
        <Routes>
          {/* Nested routes under the DashBoard layout */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="user" element={<User />} />
            <Route path="role" element={<Role />} />
            <Route path="permission" element={<Permission />} />
          </Route>
          <Route path='/' element={<PrivateRoute element={<DashBoard/>}/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

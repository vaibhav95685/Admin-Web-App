import React from "react";
import "./styles/myaccount.css";
import Navbar from "../../common/components/navbar";
import TopBar from "../../common/components/topbar";
import { Outlet } from "react-router-dom";

const MyAccount = () => {
  return (
    <div className="myAccountContainer">
      <TopBar activepage={"myaccount"} />
      <div className="myAccountMainContainer">
        <Navbar activepage={"myaccount"} />
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;

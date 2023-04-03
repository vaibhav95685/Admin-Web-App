import React from "react";
import "./styles/myStore.css";
import Navbar from "../../common/components/navbar";
import TopBar from "../../common/components/topbar";
// import GeneralSetting from "./generalSetting";
// import AdvancedSetting from "./advancedSetting";
import { Outlet } from "react-router-dom";

const MyStore = () => {
  return (
    <div className="myStoreContainer">
      <TopBar activepage={"mystore"} />
      <div className="myStoreMainContainer">
        <Navbar activepage={"mystore"} className="abcd" />
        <Outlet />
      </div>
    </div>
  );
};

export default MyStore;

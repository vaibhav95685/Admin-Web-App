import React from "react";
import "./styles/manageContent.css";
import Navbar from "../../common/components/navbar";
import TopBar from "../../common/components/topbar";
import { Outlet } from "react-router-dom";

const ManageContent = () => {
  return (
    <div className="manageContentContainer">
      <TopBar activepage={"manageContent"} />
      <div className="manageContentMainContainer">
        <Navbar activepage={"manageContent"} />
        <Outlet />
      </div>
    </div>
  );
};

export default ManageContent;

import React, { useEffect, useState } from "react";
import "./styles/nftPreviewNavbar.css";
import logo from "../../assets/images/logo.png";
import notification from "../../assets/images/notification.png";
import profile from "../../assets/images/profile.png";
import wallet from "../../assets/images/wallet.png";
import { FaSearch } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

import logoNfto from "../../assets/ANAFTO.svg"

const NftPreviewNavbar = ({ colorCode, siteLogo }) => {

  return (
    <>
      <div className="main-div">

        <div className="logo-and-search-bar">

          <img src={logoNfto} width="120px" alt="logo" />

          <div className="search-bar-div">
            <input placeholder="Search items" className="search-input" disabled={true} />   
            <FaSearch />     
         </div>
         </div>

        <div className="main-option-field-div">

          <div className="optionFieldDiv">
          <label className="common-text" style={{ borderColor: `${colorCode}` }}>
            MarketPlace
          </label>
          <label className="common-text">Leaderboard</label>
          <label className="common-text">Resources</label>
          </div>
          <button className="create-button" style={{ backgroundColor: `${colorCode}` }} >
            Create
          </button>

          <div className="iconsdiv">
          <div className="">
            <img src={notification} alt="notification" />
          </div>
          <div className="">
            <img src={profile} alt="notification" />
          </div>
          <div className="">
            <img src={wallet} alt="notification" />
          </div>
          </div>
         
          <div className="humburgerMenuDiv">
            <BiMenu className="humburger" />
          </div>

        </div>

     
    </div>
     <div className="responsiveSeaarchBar">
     <div className="nftPreviewSearchBoxContainerMobile">
       <input placeholder="Search" />
     </div>
     <div className="nftPreviewSearchIconContainerMobile">
       <FaSearch />
     </div>
   </div>
   </>
  );
};

export default NftPreviewNavbar;

import React, { useEffect,useState } from "react";
import "../../assets/styles/navbar.css";
import { NavLink } from "react-router-dom";
import myStoreIcon from "../../assets/icons/mystore.png";
import myStoreActiveIcon from "../../assets/icons/mystore_active.png";
import myItemIcon from "../../assets/icons/myitems.png";
import myItemActiveIcon from "../../assets/icons/myitems_active.png";
import myAccountActiveIcon from "../../assets/icons/myaccount_active.png";
import myAccountIcon from "../../assets/icons/myaccount.png";
import dashboardIcon from "../../assets/icons/dashboard.png";
import dashboardActiveIcon from "../../assets/icons/dashboard_active.png";
import manageContentIcon from "../../assets/icons/managecontent.png";
import manageContentActiveIcon from "../../assets/icons/managecontent_active.png";
import generalSettingsIcon from "../../assets/icons/general.png";
import generalSettingsActiveIcon from "../../assets/icons/general_active.png";
import advancedSettingsIcon from "../../assets/icons/advanced.png";
import advancedSettingsActiveIcon from "../../assets/icons/advanced_active.png";
import appearanceIcon from "../../assets/icons/appearance.png";
import appearanceActiveIcon from "../../assets/icons/appearance_active.png";
import blogIcon from "../../assets/icons/blog.png";
import blogActiveIcon from "../../assets/icons/blog_active.png";
import billingIcon from "../../assets/icons/billing.png";
import billingActiveIcon from "../../assets/icons/billing_active.png";
import notificationIcon from "../../assets/icons/notification.png";
import notificationActiveIcon from "../../assets/icons/notification_active.png";
import reportedCollectionIcon from "../../assets/icons/reportedCollection.png";
import reportedCollectionActiveIcon from "../../assets/icons/reportedCollection_active.png";
import delistedCollectionIcon from "../../assets/icons/delisted.png";
import delistedCollectionActiveIcon from "../../assets/icons/delisted_active.png";
import reportedNftIcon from "../../assets/icons/reportednfts.png";
import reportedNftActiveIcon from "../../assets/icons/reportednfts_active.png";
import removedNftIcon from "../../assets/icons/removednfts.png";
import removedNftActiveIcon from "../../assets/icons/removednfts_active.png";
import VectorIcon from "../../assets/icons/Vector.svg";
import VectorActiveIcon from "../../assets/icons/Vector-active.svg";

const Navbar = ({ activepage }) => {
  // console.log({ user, walletAddress, walletBalance });
  // console.log(activepage);
  const [isSaveClicked,setisSaveClicked]=useState(false)

 
  return (
    <div className="navbarContainer">
      <NavLink
        to="/my-store/general-settings"
        className={(navData) =>
          navData.isActive || activepage === "mystore"
            ? "navbar-link-active"
            : "navbar-link"
        }
      >
        {activepage === "mystore" ? (
          <img src={myStoreActiveIcon} alt="mystore" className="navbarIcon" />
        ) : (
          <img src={myStoreIcon} alt="mystore" className="navbarIcon" />
        )}
        My Store
      </NavLink>
      {activepage === "mystore" ? (
        <div className="secondaryLinkContainer">
          <NavLink
            to="/my-store/general-settings"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={generalSettingsActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={generalSettingsIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                General Settings
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-store/appearance"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={appearanceActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={appearanceIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Appearance
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-store/manage-metaspace"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={VectorActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={VectorIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Manage MetaSpace
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-store/blog"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={blogActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={blogIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Blog
              </div>
            )}
          </NavLink>
        </div>
      ) : (
        ""
      )}
      <NavLink
        to="/my-items/nfts"
        className={(navData) =>
          navData.isActive || activepage === "myitems"
            ? "navbar-link-active"
            : "navbar-link"
        }
      >
        {activepage === "myitems" ? (
          <img src={myItemActiveIcon} alt="mystore" className="navbarIcon" />
        ) : (
          <img src={myItemIcon} alt="mystore" className="navbarIcon" />
        )}
        Store Items
      </NavLink>
      <NavLink
        to="/my-account/general-settings"
        className={(navData) =>
          navData.isActive || activepage === "myaccount"
            ? "navbar-link-active"
            : "navbar-link"
        }
      >
        {activepage === "myaccount" ? (
          <img src={myAccountActiveIcon} alt="mystore" className="navbarIcon" />
        ) : (
          <img src={myAccountIcon} alt="mystore" className="navbarIcon" />
        )}
        My Account
      </NavLink>
      {activepage === "myaccount" ? (
        <div className="secondaryLinkContainer">
          <NavLink
            to="/my-account/general-settings"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={generalSettingsActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={generalSettingsIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                General Settings
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-account/notification-settings"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={notificationActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={notificationIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Notification Settings
              </div>
            )}
          </NavLink>
        </div>
      ) : (
        ""
      )}
      <NavLink
        to="/dashboard"
        className={(navData) =>
          navData.isActive ? "navbar-link-active" : "navbar-link"
        }
      >
        {activepage === "dashboard" ? (
          <img src={dashboardActiveIcon} alt="mystore" className="navbarIcon" />
        ) : (
          <img src={dashboardIcon} alt="mystore" className="navbarIcon" />
        )}
        Dashboard
      </NavLink>
      <NavLink
        to="/manage-content/reported-collections"
        className={(navData) =>
          navData.isActive || activepage === "manageContent"
            ? "navbar-link-active"
            : "navbar-link"
        }
      >
        {activepage === "manageContent" ? (
          <img
            src={manageContentActiveIcon}
            alt="mystore"
            className="navbarIcon"
          />
        ) : (
          <img src={manageContentIcon} alt="mystore" className="navbarIcon" />
        )}
        Manage Content
      </NavLink>
      {activepage === "manageContent" ? (
        <div className="secondaryLinkContainer">
          <NavLink
            to="/manage-content/reported-collections"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={reportedCollectionActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={reportedCollectionIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Reported Collection
              </div>
            )}
          </NavLink>
          <NavLink
            to="/manage-content/delisted-collection"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={delistedCollectionActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={delistedCollectionIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Delisted Collection
              </div>
            )}
          </NavLink>
          <NavLink
            to="/manage-content/reported-nfts"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={reportedNftActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={reportedNftIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Reported NFTs
              </div>
            )}
          </NavLink>
          <NavLink
            to="/manage-content/removed-nfts"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={removedNftActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={removedNftIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Removed NFTs
              </div>
            )}
          </NavLink>
          <NavLink
            to="/manage-content/blocked-user"
            className={(navData) =>
              navData.isActive ? "secondaryLinkactive" : "secondaryLink"
            }
          >
            {({ isActive }) => (
              <div className="secondaryLinkDiv">
                {isActive === true ? (
                  <img
                    src={myAccountActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                ) : (
                  <img
                    src={myAccountIcon}
                    alt="generalSettings"
                    className="secondaryLinkIcons"
                  />
                )}
                Blocked Users
              </div>
            )}
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;

import React from "react";
import "../../assets/styles/navbarResponsive.css";
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
import Modal from 'react-modal';

const NavbarResponsive = ({ activepage, setResponsiveNavbar,responsiveNavbar }) => {
  const createCategoryCustomStyles = {
    overlay:{
      background:"none",
    },
    content: {
      width: "34%",
      // inset: "51.4% 0px 0px 17%",
      overflow:"none",
      height: "90%",
      boxSizing: "border-box",
      backgroundColor: "none",
      position: "absolute",
      top: "51.4%",
      left: "17%",
      padding:"0px",
      transform: "translate(-50%,-50%)",
      border: "none",
      borderRadius: 0,
    },
  };
  return (
    <Modal onRequestClose={()=>setResponsiveNavbar(false)} style={createCategoryCustomStyles} isOpen={responsiveNavbar} >


    <div className="navbarContainerResponsive">
      <NavLink
        to="/my-store/general-settings"
        className={(navData) =>
          navData.isActive || activepage === "mystore"
            ? "navbar-link-activeResponsive"
            : "navbar-linkResponsive"
        }
      >
        {activepage === "mystore" ? (
          <img
            src={myStoreActiveIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        ) : (
          <img
            src={myStoreIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        )}
        My Store
      </NavLink>
      {activepage === "mystore" ? (
        <div className="secondaryLinkContainerResponsive">
          <NavLink
            to="/my-store/general-settings"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={generalSettingsActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={generalSettingsIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                General Settings
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-store/advanced-settings"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={advancedSettingsActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={advancedSettingsIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                Advance Settings
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-store/appearance"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={appearanceActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={appearanceIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                Appearance
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-store/blog"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={blogActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={blogIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                Blog
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-store/billing"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={billingActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={billingIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                Billing
              </div>
            )}
          </NavLink>
        </div>
      ) : (
        ""
      )}
      <NavLink
        to="/my-items"
        className={(navData) =>
          navData.isActive
            ? "navbar-link-activeResponsive"
            : "navbar-linkResponsive"
        }
      >
        {activepage === "myitems" ? (
          <img
            src={myItemActiveIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        ) : (
          <img
            src={myItemIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        )}
        MyItems
      </NavLink>
      <NavLink
        to="/my-account/general-settings"
        className={(navData) =>
          navData.isActive || activepage === "myaccount"
            ? "navbar-link-activeResponsive"
            : "navbar-linkResponsive"
        }
      >
        {activepage === "myaccount" ? (
          <img
            src={myAccountActiveIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        ) : (
          <img
            src={myAccountIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        )}
        My Account
      </NavLink>
      {activepage === "myaccount" ? (
        <div className="secondaryLinkContainerResponsive">
          <NavLink
            to="/my-account/general-settings"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={generalSettingsActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={generalSettingsIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                General Settings
              </div>
            )}
          </NavLink>
          <NavLink
            to="/my-account/notification-settings"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={notificationActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={notificationIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
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
          navData.isActive
            ? "navbar-link-activeResponsive"
            : "navbar-linkResponsive"
        }
      >
        {activepage === "dashboard" ? (
          <img
            src={dashboardActiveIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        ) : (
          <img
            src={dashboardIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        )}
        Dashboard
      </NavLink>
      <NavLink
        to="/manage-content/reported-collections"
        className={(navData) =>
          navData.isActive || activepage === "manageContent"
            ? "navbar-link-activeResponsive"
            : "navbar-linkResponsive"
        }
      >
        {activepage === "manageContent" ? (
          <img
            src={manageContentActiveIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        ) : (
          <img
            src={manageContentIcon}
            alt="mystore"
            className="navbarIconResponsive"
          />
        )}
        ManageContent
      </NavLink>
      {activepage === "manageContent" ? (
        <div className="secondaryLinkContainerResponsive">
          <NavLink
            to="/manage-content/reported-collections"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={reportedCollectionActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={reportedCollectionIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                Reported Collection
              </div>
            )}
          </NavLink>
          <NavLink
            to="/manage-content/delisted-collection"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={delistedCollectionActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={delistedCollectionIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                Delisted Collection
              </div>
            )}
          </NavLink>
          <NavLink
            to="/manage-content/reported-nfts"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={reportedNftActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={reportedNftIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                Reported Nfts
              </div>
            )}
          </NavLink>
          <NavLink
            to="/manage-content/removed-nfts"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={removedNftActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={removedNftIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                )}
                Removed Nfts
              </div>
            )}
          </NavLink>
          <NavLink
            to="/manage-content/blocked-user"
            className={(navData) =>
              navData.isActive
                ? "secondaryLinkactiveResponsive"
                : "secondaryLinkResponsive"
            }
            onClick={() => setResponsiveNavbar(false)}
          >
            {({ isActive }) => (
              <div className="secondaryLinkDivResponsive">
                {isActive === true ? (
                  <img
                    src={myAccountActiveIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
                  />
                ) : (
                  <img
                    src={myAccountIcon}
                    alt="generalSettings"
                    className="secondaryLinkIconsResponsive"
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
    </Modal>
  );
};

export default NavbarResponsive;

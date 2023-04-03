import { React, useState } from "react";
import "../../assets/styles/navbarResponsive.css";
import { Link, NavLink } from "react-router-dom";
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
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const NavbarMobile = ({ activepage, setResponsiveNavbar }) => {
  const [myStoreNavbar, setMyStoreNavbar] = useState(false);
  const [myAccountNavbar, setMyAccountNavbar] = useState(false);
  const [manageContentNavbar, setManageContentNavbar] = useState(false);

  return (
    <div className="navbarContainerMobile">
      {myStoreNavbar ? (
        <MyStoreNavbar
          setNavbar={setMyStoreNavbar}
          setResponsiveNavbar={setResponsiveNavbar}
        />
      ) : myAccountNavbar ? (
        <MyAccountNavber
          setNavbar={setMyAccountNavbar}
          setResponsiveNavbar={setResponsiveNavbar}
        />
      ) : manageContentNavbar ? (
        <ManageContentNavbar
          setNavbar={setManageContentNavbar}
          setResponsiveNavbar={setResponsiveNavbar}
        />
      ) : (
        <>
          <div className="navbarLinkMobile"  onClick={() => setManageContentNavbar(true)}>
            <div className="navbarLinkContainer1Mobile">
              <img
                src={myStoreIcon}
                alt="mystore"
                className="navbarIconMobile"
              />
              <div className="navbarLinkMobileText">My Store</div>
            </div>
            <div
              className="navbarLinkMobileText navbarLinkMobileArrow"
            >
              <MdKeyboardArrowRight />
            </div>
          </div>
          <Link to="/my-items" className="navbarLinkMobile">
            <div className="navbarLinkContainer1Mobile">
              <img
                src={myItemIcon}
                alt="mystore"
                className="navbarIconMobile"
              />
              <div className="navbarLinkMobileText">My Items</div>
            </div>
          </Link>
          <div className="navbarLinkMobile"  onClick={() => setManageContentNavbar(true)}>
            <div className="navbarLinkContainer1Mobile">
              <img
                src={myAccountIcon}
                alt="mystore"
                className="navbarIconMobile"
              />
              <div className="navbarLinkMobileText">My Account</div>
            </div>
            <div
              className="navbarLinkMobileText navbarLinkMobileArrow"
            
            >
              <MdKeyboardArrowRight />
            </div>
          </div>
          <Link to="/dashboard" className="navbarLinkMobile">
            <div className="navbarLinkContainer1Mobile">
              <img
                src={dashboardIcon}
                alt="mystore"
                className="navbarIconMobile"
              />
              <div className="navbarLinkMobileText">Dashboard</div>
            </div>
          </Link>
          <div className="navbarLinkMobile"  onClick={() => setManageContentNavbar(true)}>
            <div className="navbarLinkContainer1Mobile">
              <img
                src={manageContentIcon}
                alt="mystore"
                className="navbarIconMobile"
              />
              <div className="navbarLinkMobileText">Manage Content</div>
            </div>
            <div
              className="navbarLinkMobileText navbarLinkMobileArrow"
              
            >
              <MdKeyboardArrowRight />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarMobile;

const MyStoreNavbar = ({ setNavbar, setResponsiveNavbar }) => {
  return (
    <>
      <div className="navbarLinkMobile navbarLinkMobileBack navbarLinkMobileBorder">
        <div
          className="navbarLinkMobileText navbarLinkMobileArrow navbarLinkMobileArrowLeft"
          onClick={() => setNavbar(false)}
        >
          <MdKeyboardArrowLeft />
        </div>
        <div className="navbarLinkContainer1Mobile navbarLinkContainer1MobileBack">
          <img src={myStoreIcon} alt="mystore" className="navbarIconMobile" />
          <div className="navbarLinkMobileText">My Store</div>
        </div>
      </div>
      <NavLink
        to="/my-store/general-settings"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={generalSettingsActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={generalSettingsIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            General Settings
          </div>
        )}
      </NavLink>
      <NavLink
        to="/my-store/advanced-settings"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={advancedSettingsActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={advancedSettingsIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Advance Settings
          </div>
        )}
      </NavLink>
      <NavLink
        to="/my-store/appearance"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={appearanceActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={appearanceIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Appearance
          </div>
        )}
      </NavLink>
      <NavLink
        to="/my-store/blog"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={blogActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={blogIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Blog
          </div>
        )}
      </NavLink>
      <NavLink
        to="/my-store/billing"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={billingActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={billingIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Billing
          </div>
        )}
      </NavLink>
    </>
  );
};
const MyAccountNavber = ({ setNavbar }) => {
  return (
    <>
      <div className="navbarLinkMobile navbarLinkMobileBack navbarLinkMobileBorder">
        <div
          className="navbarLinkMobileText navbarLinkMobileArrow navbarLinkMobileArrowLeft"
          onClick={() => setNavbar(false)}
        >
          <MdKeyboardArrowLeft />
        </div>
        <div className="navbarLinkContainer1Mobile navbarLinkContainer1MobileBack">
          <img src={myAccountIcon} alt="mystore" className="navbarIconMobile" />
          <div className="navbarLinkMobileText">My Account</div>
        </div>
      </div>
      <NavLink
        to="/my-account/general-settings"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={generalSettingsActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={generalSettingsIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            General Settings
          </div>
        )}
      </NavLink>
      <NavLink
        to="/my-account/notification-settings"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={notificationActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={notificationIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Notification Settings
          </div>
        )}
      </NavLink>
    </>
  );
};
const ManageContentNavbar = ({ setNavbar }) => {
  return (
    <>
      <div className="navbarLinkMobile navbarLinkMobileBack navbarLinkMobileBorder  ">
        <div
          className="navbarLinkMobileText navbarLinkMobileArrow navbarLinkMobileArrowLeft"
          onClick={() => setNavbar(false)}
        >
          <MdKeyboardArrowLeft />
        </div>
        <div className="navbarLinkContainer1Mobile navbarLinkContainer1MobileBack">
          <img
            src={manageContentIcon}
            alt="mystore"
            className="navbarIconMobile"
          />
          <div className="navbarLinkMobileText">Manage Content</div>
        </div>
      </div>
      <NavLink
        to="/manage-content/reported-collections"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={reportedCollectionActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={reportedCollectionIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Reported Collection
          </div>
        )}
      </NavLink>
      <NavLink
        to="/manage-content/delisted-collection"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={delistedCollectionActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={delistedCollectionIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Delisted Collection
          </div>
        )}
      </NavLink>
      <NavLink
        to="/manage-content/reported-nfts"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={reportedNftActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={reportedNftIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Reported Nfts
          </div>
        )}
      </NavLink>
      <NavLink
        to="/manage-content/removed-nfts"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={removedNftActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={removedNftIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Removed Nfts
          </div>
        )}
      </NavLink>
      <NavLink
        to="/manage-content/blocked-user"
        className={(navData) =>
          navData.isActive ? "secondaryLinkactiveMobile" : "secondaryLinkMobile"
        }
        onClick={() => setResponsiveNavbar(false)}
      >
        {({ isActive }) => (
          <div className="secondaryLinkDivMobile">
            {isActive === true ? (
              <img
                src={myAccountActiveIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            ) : (
              <img
                src={myAccountIcon}
                alt="generalSettings"
                className="secondaryLinkIconsMobile"
              />
            )}
            Blocked Users
          </div>
        )}
      </NavLink>
    </>
  );
};

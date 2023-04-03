import { React, useEffect, useState, useRef } from "react";
import "./../../assets/styles/topbar.css";
import { FaWallet, FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarResponsive from "./navbarResponsive";
import { GiHamburgerMenu } from "react-icons/gi";
import NavbarMobile from "./NavbarMobile";
import { connect } from "react-redux";
import { removeStore } from "../../actions/storeActions";
import { ToastContainer, toast } from "react-toastify";
import { zIndex } from "material-ui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getNotifications } from "../../services/index";
import moment from "moment";
import { Link } from "react-router-dom";
import NotificationIcon from "../../assets/images/Notification.svg";
import { Helmet } from "react-helmet";

import favicon from "../../assets/icons/favicon.svg";
import logoNav from "../../assets/icons/NFTinger.svg";

// import Web3 from "web3";
// import Web3Modal from "web3modal";
// import {web3Modal} from "web3Modal"
// const web3Modal = new Web3Modal({
//   // network: "mainnet", // optional
//   cacheProvider: true, // optional
//   providerOptions, // required,
//   clearCachedProvider,
// });
let useClickOutside = (handler) => {
  let domNode = useRef();

  console.log(domNode, 'domNode')

  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNode.current !== undefined) {
        if (!domNode.current.contains(event.target)) {
          handler();
        }
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, []);

  return domNode;
};

let notificationPopup = false;
let wallerPopup = false;
let profilePopup = false;

const TopBar = ({
  store,
  walletAddress,
  walletBalance,
  removeStore,
  topicons,
  activepage,
}) => {
  const navigate = useNavigate();

  console.log(topicons, 'topicons')

  const [profileImage, setProfileImage] = useState(false);
  const [walletBox, setWalletBox] = useState(false);
  const [myAccountBox, setMyAccountBox] = useState(false);
  const [notificationBox, setNotificationBox] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(async () => {
    // if (window.ethereum) {
    //   await isMetaMaskConnected().then((connected) => {
    //     console.log(connected, "<<<<s");
    //     if (!connected) {
    //       window.location.history = "/";
    //     }
    //   });
    // }
  }, []);

  useEffect(() => {
    if (store?.client?.profilePic !== "") setProfileImage(true);
    else setProfileImage(false);
  }, []);

  useEffect(async () => {
    await getNotifications().then((res) => setNotifications(res));
  }, []);
  const handleWallet = () => {
    if (wallerPopup === false) {
      setMyAccountBox(false);
      setWalletBox(true);
      wallerPopup = true;
      setNotificationBox(false);
    } else {
      setWalletBox(false);
      wallerPopup = false;
    }
  };
  const handleMyAccount = () => {
    if (profilePopup === true) {
      setMyAccountBox(false);
      profilePopup = false;
    } else {
      setWalletBox(false);
      setMyAccountBox(true);
      setNotificationBox(false);
      profilePopup = true;
    }
  };
  const handleNotification = () => {
    console.log(notificationPopup, 'setNotificationBox')
    if (notificationPopup === false) {
      setWalletBox(false);
      setMyAccountBox(false);
      setNotificationBox(true);
      notificationPopup = true;
    } else {
      setNotificationBox(false);
      notificationPopup = false;
    }
  };

  // const [copiedText, setCopiedText] = useState(false);

  const handleCopyToClipboard = () => {
    setCopiedButton(true);

    //navigator.clipboard.writeText(walletAddressUnquoted);
    // setCopiedText(true);
    setTimeout(() => {
      setCopiedButton(false);
      // setCopiedText(false);
    }, 3000);
  };

  const [responsiveNavbar, setResponsiveNavbar] = useState(false);

  const handleResponsiveNavbar = () => {
    if (responsiveNavbar === false) {
      setResponsiveNavbar(true);
    } else {
      setResponsiveNavbar(false);
    }
  };

  const handleSignOut = () => {
    removeStore();

    toast.success("Successfully Logged Out");
    navigate('/')
    // window.location.href = "/";
    
    
    // setTimeout(() => {
      
    // }, 1000);
  };
  window.ethereum.on("disconnect", () => {
    alert("discone");
  });
  const walletSignout = async () => {
    await window.ethereum.on("disconnect", () => {
      alert("discone");
    });
    // await web3Modal.śśśś
    // await web3Modal.clearCachedProvider();
    // await window.Moralis.Web3.cleanup();
    // await window.ethereum.close();
  };

  const splitAddress = (address) => {
    var lastFive = address.substr(address.length - 4); // => "Tabs1"
    var firstFive = address.substr(0, 6);
    return `${firstFive}....${lastFive}`;
  };

  let domNode = useClickOutside(() => {
    setNotificationBox(false);
    setMyAccountBox(false);
    setWalletBox(false);
  });

  const [copiedButton, setCopiedButton] = useState(false);
  const walletAddressQuoted = JSON.stringify(walletAddress);
  const walletAddressUnquoted = walletAddressQuoted.replace(/\"/g, "");

  console.log('nft notification', notificationBox)
  return (
    <>
      <Helmet>
        <link id="favicon" rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="topbarContainer">
        <div className="navbarButtonContainer">
          <div className="topbarBrandName">
            <img src={logoNav} width={`120px`} />
          </div>
          {topicons === false ? (
            ""
          ) : (
            <GiHamburgerMenu
              className="topbarIconsEach navbarButton"
              onClick={() => handleResponsiveNavbar()}
            />
          )}
        </div>

        <div className="topbarIcons">
          {topicons === false ? (
            ""
          ) : (
            <>
              {!profileImage && (
                <FaUserAlt
                  className={`topbarIconsEach ${myAccountBox && "topbarIconsEach--active"
                    }`}
                  onClick={() => {
                    if (!myAccountBox) {
                      handleMyAccount();
                    }
                  }}
                />
              )}
              {profileImage && (
                <img
                  src={store?.client?.profilePic}
                  alt=""
                  className="topbarIconsEachImage"
                  style={{ height: '20px', marginTop: '-10px' }}
                  onClick={() => {
                    if (!myAccountBox) {
                      handleMyAccount();
                    }
                  }}
                />
              )}
              <FaWallet
                className={`topbarIconsEach ${walletBox && "topbarIconsEach--active"
                  }`}
                onClick={handleWallet}
              />
              <IoIosNotifications
                className={`topbarIconsEach ${notificationBox && "topbarIconsEach--active"
                  }`}
                onClick={handleNotification}
              />{" "}
            </>
          )}
        </div>
        {walletBox && (
          <div className="walletBoxContainer" ref={domNode}>
            <div className="walletDetail">
              <div className="walletAddressContainer">
                <div className="walletAddress">
                  {splitAddress(walletAddress)}
                </div>
                <div
                  className="walletAddressCopy"
                  onClick={() => handleCopyToClipboard()}
                >
                  <CopyToClipboard
                    text={walletAddressUnquoted}
                    onCopy={() => console.log("copy clipboard")}
                  >
                    <MdContentCopy />
                  </CopyToClipboard>
                </div>
                <div
                  className="copiedTextBox"
                  style={{ display: copiedButton ? "inline" : "none" }}
                >
                  copied
                </div>
              </div>
              <div className="walletBalanceContainer">Balance</div>
              <div className="walletBalance">
                {walletBalance === ""
                  ? 0.0
                  : parseFloat(walletBalance).toFixed(4)}{" "}
                ETH
              </div>
            </div>
            <div
              className="addFundsButton"
              onClick={() => {
                window.ethereum.request({ method: "eth_requestAccounts" });
              }}
            >
              Add Funds
            </div>
            {/* <div className="signOutButton" onClick={walletSignout}>
              <RiLogoutCircleLine className="signOutButtonIcon" />
              Sign Out
            </div> */}
          </div>
        )}
        {/* {copiedText && <div className="copiedTextBox">Copied!</div>} */}
        {myAccountBox && (
          <div className="myAccountBox" ref={domNode}>
            <NavLink
              to="/my-account/general-settings"
              className="signOutButton myAccountBoxEach"
            >
              <FaUserAlt className="signOutButtonIcon signOutButtonIconMyAccount" />
              My Account
            </NavLink>
            <div
              className="signOutButton myAccountBoxEach"
              onClick={handleSignOut}
            >
              <RiLogoutCircleLine className="signOutButtonIcon" />
              Sign Out
            </div>
          </div>
        )}
        {notificationBox && (
          <div className="notificationBox" ref={domNode}>
            <div className="header-div">
              <p className="heading">Notifications</p>
              <p className="heading-span">Mark as read</p>
            </div>
            {notifications.map((notification) => {
              const { addedOn, content, owner, type, userId } = notification;
              const time = moment(addedOn).format("LT");
              return (
                <div className="notification-div">
                  {type == "reportNFT" && (
                    <>
                      <p className="notification-text">
                        <a href="" style={{ textDecoration: "none" }}>
                          Mr.
                          {owner?.userName?.length > 0
                            ? owner.userName
                            : userId}
                        </a>
                        &nbsp;reported the&nbsp;
                        <Link
                          to="/nft-preview"
                          className="myItemnftEach"
                          state={{ nftId: content._id }}
                          style={{ textDecoration: "none" }}
                        >
                          {content.name}
                        </Link>
                        <span>&nbsp;NFT for {owner.reportedInfo.reason}</span>
                      </p>
                      <p className="notification-time">{time}</p>
                    </>
                  )}
                  {type == "buy" && (
                    <>
                      <p className="notification-text">
                        <a href="" style={{ textDecoration: "none" }}>
                          Mr.
                          {owner?.userName?.length > 0
                            ? owner.userName
                            : userId}
                        </a>
                        &nbsp;bought your&nbsp;
                        <Link
                          to="/nft-preview"
                          className="myItemnftEach"
                          state={{ nftId: content._id }}
                          style={{ textDecoration: "none" }}
                        >
                          {content.name}
                        </Link>
                        <span>
                          &nbsp;NFT for {content.salesInfo.price}&nbsp;
                          {content.salesInfo.currency}
                        </span>
                      </p>
                      <p className="notification-time">{time}</p>
                    </>
                  )}
                  {type == "bid" && (
                    <>
                      <p className="notification-text">
                        <a href="" style={{ textDecoration: "none" }}>
                          Mr.
                          {owner?.userName?.length > 0
                            ? owner.userName
                            : userId}
                        </a>
                        &nbsp;bids&nbsp;
                        {content.biddingDetails.minPrice}
                        {content.biddingDetails.currency}
                        &nbsp;for&nbsp;
                        <Link
                          to="/nft-preview"
                          className="myItemnftEach"
                          state={{ nftId: content._id }}
                          style={{ textDecoration: "none" }}
                        >
                          {content.name}
                        </Link>
                        <span>&nbsp;NFT on {moment(addedOn).format("lll")}</span>
                      </p>
                      <p className="notification-time">{time}</p>
                    </>
                  )}
                </div>
              );
            })}
            {notifications.length === 0 && (
              <div className="no-notification-div">
                <img className="no-image" src={NotificationIcon} alt=""></img>
                <p className="no-notification">No new notifications</p>
              </div>
            )}
          </div>
        )}
        {responsiveNavbar && (
          <NavbarResponsive
            activepage={activepage}
            setResponsiveNavbar={setResponsiveNavbar}
            responsiveNavbar={responsiveNavbar}
          />
        )}
        {responsiveNavbar && (
          <NavbarMobile
            activepage={activepage}
            setResponsiveNavbar={setResponsiveNavbar}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.store.store,
    walletAddress: state.store.walletAddress,
    walletBalance: state.store.walletBalance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeStore: () => dispatch(removeStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

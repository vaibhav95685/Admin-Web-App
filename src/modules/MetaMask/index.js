import { React, useState, useEffect } from "react";
import TopBar from "../../common/components/topbar";
import "./styles/walletPage.css";
import MetamaskIcon from "../../assets/metamask.png";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { connect } from "react-redux";
import { addStore } from "../../actions/storeActions";
// import { addStore, addStoreWallet } from '../../actions/storeActions';
import { login_signupWithWallet } from "../../services/authServices";
import { getTenantStore } from "../../services";
import { toast, ToastContainer } from "react-toastify";

const WalletPage = ({ addStore }) => {
  const [errorMssg, setErrorMssg] = useState(null);

  const [isMetamaskClicked, setisMetamaskClicked] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [getBalance, setGetBalance] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // const connectWalletHandler = async () => {
  //   if (window.ethereum) {
  //     window.ethereum
  //       .request({ method: 'eth_requestAccounts' })
  //       .then(async result => {
  //         accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one

  //         const user = await login_signupWithWallet(result[0]);
  //         const data = {
  //           user,
  //           walletAddress: result[0],
  //           walletBalance: '',
  //         };
  //         props.addUser(data);
  //         const store = await getTenantStore(user._id);
  //         const addStoreDispatchData = {
  //           store,
  //           walletAddress: result[0],
  //           walletBalance: '',
  //         };
  //         props.addStore(addStoreDispatchData);
  //         console.log(result[0]);
  //       });
  //   } else {
  //     setErrorMssg('Install Metamask');
  //   }
  // };
  useEffect(async () => {
    setShow(false);
    if (sessionStorage.getItem("state") != null) {
      const { store } = JSON.parse(sessionStorage.getItem("state"));
      console.log(store, "<<<store");
      if (Object.keys(store.store).length != 0) {
        toast.success("Successfully Logged In");
        setTimeout(() => {
          window.location.replace("/billing");
        }, 500);
        setShow(true);
      } else {
        setShow(true);
      }
    } else {
      console.log(sessionStorage.getItem("state"), "<<<<store");
      setShow(true);
    }
    setShow(true);
  }, []);

  const isMetaMaskConnected = async () => {
    if (!window.ethereum) return Promise.reject("Please install metamask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  };

  const connectWalletHandler = async () => {
    if (!isMetamaskClicked) {
      setisMetamaskClicked(true);

      // get address
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            // accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one
            setDefaultAccount(result[0]);

            // getbalance
            const address = result[0].toString();
            console.log(address, "<<< address fetched");
            window.ethereum
              .request({
                method: "eth_getBalance",
                params: [address, "latest"],
              })
              .then(async (balance) => {
                console.log(balance, "<<< balance");
                setGetBalance(ethers.utils.formatEther(balance));
                const walletBalance = ethers.utils.formatEther(balance);
                const store = await login_signupWithWallet(result[0]);

                if (!store) {
                  toast.error("Getting internal server error");
                  setisMetamaskClicked(false);
                  navigate('/')
                } else {

                  const data = {
                    store,
                    walletAddress: result[0],
                    walletBalance,
                  };
                  addStore(data);
                  console.log(store, "<<<");
                  toast.success("Successfully Logged In");
                  setTimeout(() => {
                    setisMetamaskClicked(false);

                    // navigate("/dashboard");
                    navigate("/billing");
                  }, 1000);

                }
                // console.log({
                //   address: result[0],
                // });
              })
              .catch((err) => {
                console.log(err);
                setisMetamaskClicked(false);
                toast.error("Error While Login");
              });
          })
          .catch((err) => {
            console.log(err);
            setisMetamaskClicked(false);
            toast.error("Error While Login");
          });
      } else {
        console.log("login metamask and refresh page");
        setErrorMssg("Install Metamask");
        setisMetamaskClicked(false);
      }
    }
  };
  window.ethereum.on("disconnect", () => {
    alert("discone");
  });
  const accountChangeHandler = (newAccount) => {
    // alert("che");
    console.log(newAccount, "<<<<newACcount");
    setDefaultAccount(newAccount);
    window.ethereum
      .request({ method: "eth_getBalance", params: [newAccount, "latest"] })
      .then(async (balance) => {
        console.log(balance, "<<< balance");
        setGetBalance(ethers.utils.formatEther(balance));
        const walletBalance = ethers.utils.formatEther(balance);
        const store = await login_signupWithWallet(result[0]);
        const data = {
          store,
          walletAddress: result[0],
          walletBalance,
        };
        addStore(data);
        toast.info("Successfully Logged In");
        navigate("/");
        // console.log({
        //   address: result[0],
        // });
      });
    navigate("/");
  };


  useEffect(()=>{
    window.ethereum?.on("accountsChanged", accountChangeHandler);
  },[])
  // window.ethereum?.on("accountsChanged", accountChangeHandler);

  // const getUserBalance = address => {
  //   window.ethereum
  //     .request({ method: 'eth_getBalance', params: [address, 'latest'] })
  //     .then(balance => {
  //       setGetBalance(ethers.utils.formatEther(balance));
  //     });
  // };

  return (
    <div className="walletPage">
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
      {show && (
        <>
          <TopBar topicons={false} />
          <div className="walletPageMainContainer">
            <div className="walletHeading">Connect Wallet</div>
            <div className="walletLine">
              Connect your wallet and start creating your store
            </div>
            <div className="walletBox" onClick={connectWalletHandler}>
              <img src={MetamaskIcon} alt="metamask" />
              <div className="walletBoxTitle">Metamask</div>
            </div>
            {errorMssg}
            {/* address = {defaultAccount}
        <div>balance = {getBalance}</div> */}
          </div>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStore: (data) => dispatch(addStore(data)),
  };
};

export default connect(null, mapDispatchToProps)(WalletPage);

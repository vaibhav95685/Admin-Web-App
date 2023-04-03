import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from "../../utility";

function RequireAuth({ children }) {
  const isAuthenticated = useRef(false);
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);

  const [getBalance, setGetBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(async () => {
    if (window.ethereum) {
      await isMetaMaskConnected().then((connected) => {
        
        if (!connected) {
          // alert("logg out");
        }
      });
    } else {
      // alert("log out kjk");
    }
  }, []);

  const accountChangeHandler = (newAccount) => {
    // alert("che");    
    setDefaultAccount(newAccount);
    window.ethereum
      .request({ method: "eth_getBalance", params: [newAccount, "latest"] })
      .then(async (balance) => {        
        setGetBalance(ethers.utils.formatEther(balance));
        const walletBalance = ethers.utils.formatEther(balance);
        const store = await login_signupWithWallet(result[0]);
        const data = {
          store,
          walletAddress: result[0],
          walletBalance,
        };
        addStore(data);
        navigate("/");
      });
    navigate("/");
  };
  // window.ethereum?.on("accountsChanged", accountChangeHandler);

  const isMetaMaskConnected = async () => {
    if (!window.ethereum) return Promise.reject("Please install metamask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  };

  if (sessionStorage.getItem("state")) {
    const { store } = JSON.parse(sessionStorage.getItem("state"));
    
    if (!isEmptyObject(store.store)) isAuthenticated.current = Boolean(store);
    else isAuthenticated.current = false;
  } else isAuthenticated.current = false;

  // return isAuthenticated.current ? children : <Navigate to="/" replace />;
  return isAuthenticated.current ? children : window.location.replace("/");
}

export default RequireAuth;

// function ProtectedRoute({ component: Component, ...restOfProps }) {
//   const { store, user } = JSON.parse(sessionStorage.getItem('state'));
//   //   const {user} = JSON.parse(sessionStorage.getItem('state'));
//   const isAuthenticated = Boolean(user && store);
//   console.log('this', isAuthenticated);

//   return (
//     <Route
//       {...restOfProps}
//       render={props =>
//         isAuthenticated ? <Component {...props} /> : <Navigate replace to='/' />
//       }
//     />
//   );
// }

// export default ProtectedRoute;

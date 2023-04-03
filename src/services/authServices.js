import { httpConstants } from '../constants';

export const login_signupWithWallet = async wallet_address => {
  try {
    const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        wallet: wallet_address,
      }),
    });
    const result = await res.json();
    if (result.success) return result.responseData;
    // const store = result.responseData;
    else return false;
  } catch (err) {
    return false
    console.log(err);
  }
};

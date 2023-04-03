let initialState = {
  // loginFailure: null,
  // deviceId: null,
  // sessionToken: null,
  // loading: false,
  // isForgotPasswordSuccess: false
  // isLoggedIn: false,
  user: {},
  walletAddress: '',
  walletBalance: '',
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      // console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        walletAddress: action.payload.walletAddress,
        walletBalance: action.payload.walletBalance,
      };
    case 'REMOVE_USER':
      return initialState;
    default:
      return state;
  }
}

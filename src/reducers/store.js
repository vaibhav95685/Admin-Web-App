let initialState = {
  // isLoggedIn: false,
  // loginFailure: null,
  // deviceId: null,
  // sessionToken: null,
  // loading: false,
  // isForgotPasswordSuccess: false
  store: {},
  walletAddress: '',
  walletBalance: '',
};
export default function store(state = initialState, action) {
  switch (action.type) {
    case 'ADD_STORE':
      localStorage.setItem('tenantUserId', action.payload.store?._id)
      return {
        ...state,
        store: action.payload.store,
        walletAddress: action.payload.walletAddress,
        walletBalance: action.payload.walletBalance,
      };

    case 'UPDATE_COLOR_PALETTE':
      return {
        ...state,
        store: {
          ...state.store,
          appearance: {
            ...state.store.appearance,
            colorPalette: action.payload
          }
        }
      }

    case 'UPATE_APPEARANCE_HEADING':
      return {
        ...state,
        store: {
          ...state.store,
          appearance: {
            ...state.store.appearance,
            heading: action.payload
          }
        }
      }

    case 'UPATE_APPEARANCE_DESCRIPTION':
      return {
        ...state,
        store: {
          ...state.store,
          appearance: {
            ...state.store.appearance,
            description: action.payload
          }
        }
      }

    case 'UPATE_APPEARANCE_BUTTON':
      return {
        ...state,
        store: {
          ...state.store,
          appearance: {
            ...state.store.appearance,
            buttons: action.payload
          }
        }
      }

    case 'UPATE_APPEARANCE_COVER_IMAGE':
      return {
        ...state,
        store: {
          ...state.store,
          appearance: {
            ...state.store.appearance,
            coverImageUrl: action.payload
          }
        }
      }

    case 'UPATE_APPEARANCE_FEATURE_ASSETS':
      return {
        ...state,
        store: {
          ...state.store,
          appearance: {
            ...state.store.appearance,
            featuredAssets: action.payload
          }
        }
      }  

      case 'UPATE_APPEARANCE_COVER_POSITION':
        return{
          ...state,
          store: {
            ...state.store,
            appearance: {
              ...state.store.appearance,
              coverPosition: action.payload
            }
          }
        }

    case 'ADD_STORE_WALLET':
      return {
        ...state,
        walletAddress: action.payload.walletAddress,
      };

    case 'UPDATE_STORE':
      return {
        ...state,
        store: action.payload.store,
      };

    case 'REMOVE_STORE':
      return initialState;

    default:
      return state;
  }
}

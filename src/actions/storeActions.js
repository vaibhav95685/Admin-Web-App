export function addStore(data) {
  return {
    type: 'ADD_STORE',
    payload: {
      store: data.store,
      walletAddress: data.walletAddress,
      walletBalance: data.walletBalance,
    },
  };
}

export function addStoreWallet(data) {
  return {
    type: 'ADD_STORE_WALLET',
    payload: {
      walletAddress: data,
    },
  };
}

export function updateStore(data) {
  return {
    type: 'UPDATE_STORE',
    payload: {
      store: data.store,
    },
  };
}

export function removeStore() {
  return {
    type: 'REMOVE_STORE',
  };
}

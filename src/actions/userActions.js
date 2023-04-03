export function addUser(data) {
  return {
    type: 'ADD_USER',
    payload: {
      user: data.user,
      walletAddress: data.walletAddress,
      walletBalance: data.walletBalance,
    },
  };
}

export const removeUser = () => ({
  type: 'REMOVE_USER',
});

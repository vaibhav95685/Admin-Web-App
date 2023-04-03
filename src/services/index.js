// import axios from "axios";
import { httpConstants } from "../constants";
import store from "../store";
// import axios from "axios";
// Utility

const getTanentUserId = () => {
  return `?id=${localStorage.getItem('tenantUserId')}`
}

export const checkStatusCode = (status, responseCode) => {
  console.log(status, responseCode,"check");
  // alert(status);
  if ( responseCode == "401") {
    // alert(responseCode);
    // alert("here");
    sessionStorage.clear();
    window.location.href = "/";
  }
  // if (responseCode == 401) {
  // }
};

export const getNotifications = async () => {
  const res = await fetch(`${httpConstants.BASE_URL2}/api/v1/admin/notification${getTanentUserId()}`);
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  if (result.success) return result.responseData;
};

export const getParticularCollection = async (_id, setParticularCollection) => {
  fetch(`${httpConstants.BASE_URL2}/api/v1/collection/${_id}`)
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);
      if (result.success) setParticularCollection(result.responseData);
      else console.log(result, "<<< getParticularCollection err");
    })
    .catch((err) => console.log(err));
};

export const getParticularNft = async (_id) => {
  const res = await fetch(`${httpConstants.BASE_URL2}/api/v2/nfts/${_id}${getTanentUserId()}`);
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  console.log(result, "<<<<");
  if (result.success) return result.responseData[0];
  else console.log(result, "<<< getParticularNft err");
};

export const getParticularUser = async (_id) => {
  try {
    const res = await fetch(`${httpConstants.BASE_URL4}/api/v1/user/${_id}`);
    const result = await res.json();
    const user = result.responseData;
    checkStatusCode(result.status, result.responseCode);

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const getNameImageOfUser = async (_id) => {
  try {
    const res = await fetch(`${httpConstants.BASE_URL4}/api/v1/user/${_id}`);
    const result = await res.json();
    checkStatusCode(result.status, result.responseCode);

    if (result.success) {
      const user = result.responseData;
      return {
        name: user.firstName + " " + user.lastName,
        imageUrl: user.cdnUrl,
      };
    } else console.log(result, "<<< getUser err");
  } catch (err) {
    console.log(err);
  }
};

export const getTenantStore = async (_id, token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/tenant/${_id}`, {
    headers: {
      "x-access-token": token,
    },
  });

  const store = await res.json();
  checkStatusCode(store.status, store.responseCode);
  if (store.success) return store.responseData;
  else console.log(store, "getTenantStore err");
};

export const getNftsByCollectionId = async (_id) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/collection/${_id}/nfts${getTanentUserId()}`
  );

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;
};

// MY STORE SERVICES
// GENERAL SETTINGS
export const putStoreGeneralSettings = async (tenantId, data, token) => {
  try {
    const res = await fetch(
      `${httpConstants.BASE_URL1}/api/v1/store-general-settings/${tenantId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
          "x-access-token": token,
        },
        body: JSON.stringify(data),
      }
    );
    console.log(res, "<<<<res");
    const result = await res.json();
    checkStatusCode(result.status, result.responseCode);
    return result;
    // if (result.success) return result.responseData;
    // else console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// ADVANCE SETTINGS
export const putStoreAdvanceSettings = async (tenantId, data, token) => {
  try {
    const res = await fetch(
      `${httpConstants.BASE_URL1}/api/v1/store-advance-settings/${tenantId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
          "x-access-token": token,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();
    checkStatusCode(result.status, result.responseCode);
    return result;
    // if (result.success) return result.responseData;
    // else console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export const getAdvSettingCategories = async (token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/categories${getTanentUserId()}`, {
    method: httpConstants.METHOD_TYPE.GET,
    headers: {
      "x-access-token": token,
    },
  });

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;
};

export const saveStoreTC = async (storeId, token, data) => {
  const res = await fetch(
    `${httpConstants.BASE_URL1}/api/v1/store-terms/${storeId}`,
    {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;
};

export const saveStorePP = async (storeId, token, data) => {
  const res = await fetch(
    `${httpConstants.BASE_URL1}/api/v1/privacy-policy/${storeId}`,
    {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;
};

// APPEARANCE SETTINGS
export const updateAppearanceSettings = async (tenantId, data, token) => {
  try {
    const res = await fetch(
      `${httpConstants.BASE_URL1}/api/v1/tenant/${tenantId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
          "x-access-token": token,
        },
        body: JSON.stringify({ appearance: data }),
      }
    );

    const result = await res.json();
    checkStatusCode(result.status, result.responseCode);
    return result;
    // if (result.success) return result.responseData;
    // else console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export const updateMetaSpace = async (tenantId, data, token) => {
  try {
    const res = await fetch(
      `${httpConstants.BASE_URL1}/api/v1/metaspace/${tenantId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
          "x-access-token": token,
        },
        body: JSON.stringify({ metaSpace: data }),
      }
    );

    const result = await res.json();
    checkStatusCode(result.status, result.responseCode);
    return result;
    // if (result.success) return result.responseData;
    // else console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export const getAssets = async (token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/assets`, {
    headers: {
      "x-access-token": token,
    },
  });
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  if (result.success) return result.responseData.assetContent;
  else console.log(result, "<<< getAssets err");
};


export const getMaketplaceNft= async (token) => {
  const res = await fetch(`${httpConstants.BASE_URL2}/api/v1/nfts${getTanentUserId()}`, {
    headers: {
      "x-access-token": token,
    },
  });
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  if (result.success) return result.responseData.nftContent;
  else console.log(result, "<<< nfts err");
};

export const addAsset = async (data, token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/asset`, {
    method: httpConstants.METHOD_TYPE.POST,
    headers: {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;

  // if (result.success) return result.responseData;
  // else console.log(result, '<<< addAsset err');
};

// BLOG
export const getBlogs = async (setBlogs, token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/blogs${getTanentUserId()}`, {
    headers: {
      "x-access-token": token,
    },
  });

  const result = await res.json();
  console.log(result, "<<<< get blogs");
  checkStatusCode(result.status, result.responseCode);
  return result;

  // fetch(`${httpConstants.BASE_URL1}/api/v1/blogs`, {
  //   headers: {
  //     'x-access-token': token,
  //   },
  // })
  //   .then(res => res.json())
  //   .then(result => setBlogs(result.responseData))
  //   .catch(err => console.log(err));
};

export const addBlog = async (data, token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/blog/`, {
    method: httpConstants.METHOD_TYPE.POST,
    headers: {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });

  console.log(res, "<<<<add blog");
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;
  // if (result.success) return result.responseData;
  // else console.log(result, '<<< addBlog err');
};

export const editBlog = async (_id, data, token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/blog/${_id}`, {
    method: httpConstants.METHOD_TYPE.PUT,
    headers: {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;
};

export const deleteBlog = async (_id, token) => {
  try {
    const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/blog/${_id}${getTanentUserId()}`, {
      method: httpConstants.METHOD_TYPE.DELETE,
      headers: {
        "x-access-token": token,
      },
    });

    const result = await res.json();
    checkStatusCode(result.status, result.responseCode);
    return result;
    // if (result.success) return result;
    // else console.log(result, '>>> deleteBlogCategory err');
  } catch (err) {
    console.log(err);
  }
};

export const getBlogCategories = async (setBlogCategories, token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/blogcategories${getTanentUserId()}`, {
    headers: {
      "x-access-token": token,
    },
  });

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  return result;

  // fetch(`${httpConstants.BASE_URL1}/api/v1/blogcategories`, {
  //   headers: {
  //     'x-access-token': token,
  //   },
  // })
  //   .then(res => res.json())
  //   .then(result => setBlogCategories(result.responseData.categoryContent))
  //   .catch(err => console.log(err));
};

export const addBlogCategory = async (data, token) => {
  const res = await fetch(`${httpConstants.BASE_URL1}/api/v1/blogcategory${getTanentUserId()}`, {
    method: httpConstants.METHOD_TYPE.POST,
    headers: {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-access-token": token,
    },
    body: JSON.stringify({
      categoryName: data.categoryName,
      addedBy: data.addedBy,
      // parentId: data.parentId
    }),
  });

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  return result;
  // if (result.success) return result.responseData;
  // else console.log(result.message, '>>> addBlogCategory err');
};

export const editBlogCategory = async (data, token) => {
  const res = await fetch(
    `${httpConstants.BASE_URL1}/api/v1/blogcategory/${data._id}${getTanentUserId()}`,
    {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        "x-access-token": token,
      },
      body: JSON.stringify({ categoryName: data.content }),
    }
  );

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  return result;
};

export const deleteBlogCategory = async (_id, token) => {
  try {
    const res = await fetch(
      `${httpConstants.BASE_URL1}/api/v1/blogcategory/${_id}${getTanentUserId()}`,
      {
        method: httpConstants.METHOD_TYPE.DELETE,
        headers: {
          "x-access-token": token,
        },
      }
    );

    const result = await res.json();
    checkStatusCode(result.status, result.responseCode);

    return result;
    // if (result.success) return result;
    // else console.log(result.message, '>>> deleteBlogCategory err');
  } catch (err) {
    console.log(err);
  }
};

// MY ITEMS SERVICES
export const getTenantNfts = (minPrice, maxPrice, sort, setNftsData, token, walletAddress) => {
  let url = new URL(`${httpConstants.BASE_URL2}/api/v1/tenant/nfts`);
  url.search = new URLSearchParams({
    // type,
    id: localStorage.getItem('tenantUserId'),
    maxPrice,
    minPrice,
    sort,
    walletAddress
  });

  fetch(url, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      // checkStatusCode(result.status, result.responseCode);
      if (result.success) setNftsData(result.responseData.nftContent);
      else console.log(result.message, ">>> getNfts err");
    })
    .catch((err) => console.log(err));
};

export const getTenantCollections = (requestData, setCollections, token) => {
  fetch(
    `${httpConstants.BASE_URL2}/api/v1/tenant/collections`+ getTanentUserId()+'&' + requestData,
    {
      headers: {
        "x-access-token": token,
      },
    }
  )
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      if (result.success) setCollections(result.responseData);
      else console.log(result.message, "<<< getCollections err");
    })
    .catch((err) => console.log(err));
};

export const getNfts = (minPrice, maxPrice, sort, setNftsData, token) => {
  let url = new URL(`${httpConstants.BASE_URL2}/api/v1/admin/nfts`);

  url.search = new URLSearchParams({
    // type,
    id: localStorage.getItem('tenantUserId'),
    maxPrice,
    minPrice,
    sort,
    walletAddress: store.getState().store?.walletAddress
  });

  fetch(url, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      // checkStatusCode(result.status, result.responseCode);
      if (result.success) setNftsData(result.responseData.nftContent);
      else console.log(result.message, ">>> getNfts err");
    })
    .catch((err) => console.log(err));
};

export const getCollections = (requestData, setCollections, token) => {
  fetch(
    `${httpConstants.BASE_URL2}/api/v1/admin/collections`+ getTanentUserId()+'&' + requestData+'&walletAddress='+store.getState().store?.walletAddress,
    {
      headers: {
        "x-access-token": token,
      },
    }
  )
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      if (result.success) setCollections(result.responseData.collections);
      else console.log(result.message, "<<< getCollections err");
    })
    .catch((err) => console.log(err));
};

// MY ACCOUNT SERVICES
// GENERAL SETTINGS
export const put_accountGeneralSettings = async (userId, data, token) => {
  try {
    const res = await fetch(
      `${httpConstants.BASE_URL1}/api/v1/account-general-settings/${userId}`,
      {
        method: httpConstants.METHOD_TYPE.PUT,
        headers: {
          "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
          "x-access-token": token,
        },
        body: JSON.stringify(data),
      }
    );
    checkStatusCode(res.status, res.responseCode);

    const result = await res.json();
    return result;
    // if (result.success) {
    //   console.log(result.message);
    //   return result.responseData;
    // } else
    //   console.log(
    //     { message: result.message, errors: result.errors },
    //     '<<< accountGeneralSettings err'
    //   );
  } catch (err) {
    console.log(err);
  }
};

// NOTIFICATION SETTINGS
export const updateNotificatonSettings = async (userId, data, token) => {
  const res = await fetch(
    `${httpConstants.BASE_URL1}/api/v1/account-notification-settings/${userId}`,
    {
      method: httpConstants.METHOD_TYPE.PUT,
      headers: {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    }
  );
  checkStatusCode(res.status, res.responseCode);

  const result = await res.json();
  return result;
  // if (result.success) return result.responseData;
  // else console.log(result, '<<< updateNotificatonSettings err');
};

// DASHBOARD SERVICES
export const getTotalRevenue = (setTotalRevenue) => {
  fetch(`${httpConstants.BASE_URL3}/api/v1/total-revenue${getTanentUserId()}`)
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);
      setTotalRevenue(result.responseData[0].totalRevenue);
    })
    .catch((err) => console.log(err));
};

export const getSoldNftCount = (setTotalNftSold) => {
  fetch(`${httpConstants.BASE_URL2}/api/v1/sold-nfts-count${getTanentUserId()}`)
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      if (result.success) setTotalNftSold(result.responseData.soldNftsCount);
      else console.log(result, "getSoldNftCount err");
    })
    .catch((err) => console.log(err));
};

// -------------------- 531
export const getTotalUserCount = (setTotalUserCount, token) => {
  // console.log(token);
  fetch(`${httpConstants.BASE_URL4}/api/v1/users${getTanentUserId()}`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      if (result.success)
        setTotalUserCount(result.responseData.totalUsersCount);
      else console.log(result, "<<< getTotalUserCount err");
    })

    .catch((err) => console.log(err));
};

export const getTotalNftCreated = (setTotalNftCreated) => {
  fetch(`${httpConstants.BASE_URL2}/api/v1/nfts${getTanentUserId()}`)
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      if (result.success) setTotalNftCreated(result.responseData.totalNftCount);
      else console.log(result.message, "<<< getTotalNftCreated err");
    })
    .catch((err) => console.log(err));
};

export const getSoldNftGraph = async (graphPeriod) => {
  // console.log('dyufgsh', momentDateMonth(1645856792906));
  const res = await fetch(`${httpConstants.BASE_URL3}/api/v1/sold-nft-graphs${getTanentUserId()}&duration=${graphPeriod}`);
  const result = await res.json();
  if (result.success) {
    checkStatusCode(result.status, result.responseCode);

    // const sixMonth = result.responseData.sixMonth.map(item => ({
    //   x: momentDateMonth(item._id.addedOn),
    //   y: item.total,
    // }));
    // console.log(sixMonth);
    return result.responseData;
  } else console.log(result, "<<< getSoldNftGraph err");
};

export const getTopCollections = async (setTopCollections) => {
  fetch(`${httpConstants.BASE_URL3}/api/v1/top-collections${getTanentUserId()}`)
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      if (result.success) {
        setTopCollections(result.responseData);
      } else console.log(result);
    })
    .catch((err) => console.log(err));
};

export const getTopNfts = (setTopNfts) => {
  fetch(`${httpConstants.BASE_URL2}/api/v1/get-top-nfts${getTanentUserId()}`)
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      if (result.success) setTopNfts(result.responseData);
      else console.log(result.message, "<<< getTopNfts err");
    })
    .catch((err) => console.log(err));
};

// MANAGE CONTENT SERVICES
// REPORTED COLLECTION
export const getReportedCollection = (setReportedCollections, duration) => {
  fetch(
    `${httpConstants.BASE_URL2}/api/v1/reported/collections${getTanentUserId()}&duration=${duration}`
  )
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);
      setReportedCollections(result.responseData);
    })
    .catch((err) => console.log(err));
};

export const getCollectionNfts = async (collectionId, setCollectionNfts, token, reqObj) => {
  let url = `${httpConstants.BASE_URL2}/api/v1/collection/${collectionId}/nfts${getTanentUserId()}&` + reqObj
  fetch(url, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);
      if (result.success) setCollectionNfts(result.responseData.nftContent);
      else console.log(result.message, ">>> get collection data err");
    })
    .catch((err) => console.log(err));
};
// export const getCollectionNfts = (collectionId, setCollectionNfts) => {
//   fetch(`${httpConstants.BASE_URL2}/api/v1/collection/${collectionId}/nfts`)
//     .then((res) => res.json())
//     .then((result) => {
//       checkStatusCode(result.status, result.responseCode);

//       setCollectionNfts(result.responseData.nftContent);
//     })
//     .catch((err) => console.log(err));
// };

export const deleteCollectionReport = async (_id) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/delete-collection-report/${_id}${getTanentUserId()}`,
    {
      method: httpConstants.METHOD_TYPE.PUT,
    }
  );

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  // console.log(result, '<<< deleteCollectionReport res');
  return result;
  // if (result.success) return result;
  // else console.log(result, '<<< deleteCollectionReport err');
};

export const delistReportedCollection = async (_id) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/collections/${_id}${getTanentUserId()}`,
    {
      method: httpConstants.METHOD_TYPE.DELETE,
    }
  );

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;
  // if (result.success) return result;
  // else console.log(result, '<<< delistReportedCollection err');
};

// DELISTED COLLECTION
export const getDelistedCollections = async (duration) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/reports/collections-delisted${getTanentUserId()}&duration=${duration}`
  );
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  if (result.success) return result.responseData;
};

// -----671

export const relistDelistedCollection = async (_id) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/collections/${_id}/relist${getTanentUserId()}`,
    {
      method: httpConstants.METHOD_TYPE.PUT,
    }
  );

  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);
  return result;
  // if (result.success) return result;
  // else console.log(result, '<<< relistRemovedCollection err');
};

// REPORTED NFTS
export const getReportedNfts = async (duration) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/reports/nfts${getTanentUserId()}&duration=${duration}`
  );
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  return result;

  // fetch(`${httpConstants.BASE_URL2}/api/v1/reports/nfts?duration=${sortBy}`)
  //   .then((res) => res.json())
  //   .then((result) => setReportedNfts(result.responseData))
  //   .catch((err) => console.log(err));
};

export const post_RemoveNft = async (_id) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/nfts/${_id}/remove${getTanentUserId()}`,
    {
      method: httpConstants.METHOD_TYPE.POST,
    }
  );
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  return result;
  // if (result.success) {
  //   console.log(result, '<<< nft removed');
  //   return result;
  // } else console.log(result, '<<< nftRemove err');
};

export const removeNftAndBlockUser = async (nftId, userId, token) => {
  const nftRes = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/nfts/${nftId}/remove${getTanentUserId()}`,
    {
      method: httpConstants.METHOD_TYPE.POST,
    }
  );
  const nftResult = await nftRes.json();
  checkStatusCode(nftResult.status, nftResult.responseCode);

  const blockUserRes = await fetch(
    `${httpConstants.BASE_URL4}/api/v1/block-user/${userId}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};

export const blockUser = async (userId, token,requestData) => {
  console.log(requestData,"<<requestDataApi")
  const blockUserRes = await fetch(
    `${httpConstants.BASE_URL4}/api/v1/block-user/${userId}${getTanentUserId()}`,
    { 
      method: httpConstants.METHOD_TYPE.POST,
      body:JSON.stringify(requestData),
      headers: {
        "x-access-token": token,
      },
    }
  );

  const result = await blockUserRes.json();
  checkStatusCode(result.status, result.responseCode);

  return result;
};

export const deleteNftReport = async (_id) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/reports/${_id}/nfts${getTanentUserId()}`,
    {
      method: httpConstants.METHOD_TYPE.DELETE,
    }
  );
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  return result;
  //   if (result.success) {
  //     console.log(result, '<<< nft report deleted');
  //     return result;
  //   } else console.log(result, '<<< deleteNftReport err');
};

// REMOVED NFTS
export const getRemovedNfts = (setRemovedNfts, duration) => {
  fetch(`${httpConstants.BASE_URL2}/api/v1/nfts/removed${getTanentUserId()}&duration=${duration}`)
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      setRemovedNfts(result.responseData);
    })
    .catch((err) => console.log(err));
};

export const post_undoRemoveNft = async (_id) => {
  const res = await fetch(
    `${httpConstants.BASE_URL2}/api/v1/nfts/${_id}/unremove${getTanentUserId()}`,
    {
      method: httpConstants.METHOD_TYPE.POST,
    }
  );
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  return result;
  // if (result.success) {
  //   return result;
  // } else console.log(result, '<<< undoRemoveNft err');
};

// BLOCKED USERS
export const getBlockedUsers = (setBlockedUsers, token) => {
  fetch(`${httpConstants.BASE_URL4}/api/v1/blocked-users${getTanentUserId()}`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      setBlockedUsers(result.responseData.blockUsers);
    })
    .catch((err) => console.log(err));
};

export const unblockUser = async (_id, token) => {
  const res = await fetch(
    `${httpConstants.BASE_URL4}/api/v1/unblock-user/${_id}${getTanentUserId()}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  const result = await res.json();
  checkStatusCode(result.status, result.responseCode);

  return result;
  // if (result.success) return result.responseData;
  // else console.log(result, '<<< unblockUser err');
};

export async function createSubDomain(reqData,AuthToken){

   const authToken = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": `${AuthToken}`,
  };
  try{
    const url = `${httpConstants.BASE_URL1}/api/v1/create-subdomain`;
    const res = await fetch(url, {method: 'POST', headers: authToken,body: JSON.stringify(reqData) });
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);

  }
}
export async function createSubsription(reqData,AuthToken){

  const authToken = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": `${AuthToken}`,
  };
  try{
    const url = `${httpConstants.BASE_URL0}/api/v1/subscriptions`;
    const res = await fetch(url, {method: 'POST', headers: authToken,body: JSON.stringify(reqData) });
    const result = await res.json();
    return result;
  }catch(err){
    console.log(err);

  }
}
export const BillingPlan = (setPlans, token) => {
  console.log(token, "<<<<<toekn");
  fetch(`${httpConstants.BASE_URL0}/api/v1/subscriptions`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      checkStatusCode(result.status, result.responseCode);

      setPlans(result.responseData);
    })
    .catch((err) => console.log(err));
};
export const BillingYearly = (setYearlyPlans, token) => {
  console.log(token, "<<token");
  fetch(`${httpConstants.BASE_URL0}/api/v1/subscriptions?billingCycle=Yearly`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      // setYearlyPlans(result.status, result.responseCode);

      setYearlyPlans(result.responseData);
    })
    .catch((err) => console.log(err));
};

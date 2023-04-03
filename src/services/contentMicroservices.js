// import { contextType } from "react-swipe";
import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getParamTenantId } from "../utility/global";

const BASE_URL1 = "https://www.nftinger.com:3002/"; // need to store it in .env file

// export default createNftContent;

export const createNftContent = async (requestdata, token) => {

  console.log('called nft function', requestdata, token)

  let url = BASE_URL1 + "api/v1/nft" + getParamTenantId();

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestdata)
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (
        !result.success ||
        result.responseCode !== 200 ||
        !result.responseData ||
        result.responseData.length === 0
      )
        return false;

      return result.responseData;

    })
    .catch(error => { return false })

  // console.log(requestdata, "<<<<<<<<", url, "<<<<< createnfft response");
  // return httpService(
  //   'POST',
  //   // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
  //   token,
  //   requestdata,
  //   url
  // )
  //   .then((response) => {
  //     if (
  //       !response.success ||
  //       response.responseCode !== 200 ||
  //       !response.responseData ||
  //       response.responseData.length === 0
  //     )
  //       return Promise.reject();
  //     return Promise.resolve(response.responseData);
  //   })
  //   .catch(function (err) {
  //     return Promise.reject(err);
  //   });
}

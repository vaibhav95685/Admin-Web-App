import { httpService, httpServiceFileUpload } from "./httpService";
import store from "../store";

const baseUrl_2 = 'https://www.nftinger.com:3002/';

export const getParamTenantId = () => {

    if (localStorage.getItem('tenantUserId') != 'null') return `?id=${localStorage.getItem('tenantUserId')}`
    else return '?id=624fcce73cfee400358f2cef'
}

export const addIpfs = (requestdata) => {
    // let url = "http://localhost:3001" + "/add-file-ipfs";
    let url = baseUrl_2 + "api/v1/add-file-ipfs" + getParamTenantId();

    return httpServiceFileUpload(
        'POST',
        {},
        requestdata,
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject(response);
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}


export function updateCollectionTxStatus(requestData, _id) {
    let url = baseUrl_2 + "api/v1/collections/" + _id + "/status" + getParamTenantId();

    return httpService(
        'PUT',
        {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            "x-access-token": `${store.getState()?.store?.token}`
        },
        requestData,
        url
    )
        .then((response) => {
            if (
                !response.success ||
                response.responseCode !== 200 ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();
            return Promise.resolve(response.responseData);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}
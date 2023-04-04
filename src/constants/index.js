/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */

export const httpConstants = {
  BASE_URL0:
    'http://abc.xdcbridge.com/https://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3000', //admin
  BASE_URL1:
    'http://abc.xdcbridge.com/https://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3001', // client config
  BASE_URL2:
    'http://abc.xdcbridge.com/https://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3002', // content microservice
  BASE_URL3:
    'http://abc.xdcbridge.com/https://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3003', // sell purchase
  BASE_URL4:
    'http://abc.xdcbridge.com/https://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3004', // user management
  METHOD_TYPE: {
    POST: 'POST',
    PUT: 'PUT',
    GET: 'GET',
    DELETE: 'DELETE',
  },
  CONTENT_TYPE: {
    APPLICATION_JSON: 'application/json',
    MULTIPART_FORM_DATA: 'multipart/form-data',
    APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
    IMAGE_PNG: 'image/png',
  },
  DEVICE_TYPE: {
    WEB: 'web',
  },
  API_END_POINT: {},
};

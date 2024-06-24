export const SERVER_URL = process.env.REACT_APP_SERVERIP;
export const ENDPOINT_SETTINGS = "/settings";
export const ENDPOINT_TEST = "/test";

export const url = () => {
  if (process.env.SERVER_URL !== null) {
    return SERVER_URL;
  } else {
    return "http://127.0.0.1:8081";
  }
};
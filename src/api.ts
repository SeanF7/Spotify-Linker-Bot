import axios from "axios";
import { state } from "./store";

const api = axios.create({
  baseURL: "http://api.spotify.com",
});

const serialize = function (obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
};

const apiRefresh = axios.create({
  baseURL: "https://accounts.spotify.com",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken(error);
      originalRequest.headers.Authorization = "Bearer " + state.accessToken;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

async function refreshToken(error) {
  return new Promise((resolve, reject) => {
    try {
      apiRefresh
        .post(
          "https://accounts.spotify.com/api/token",
          serialize({
            grant_type: "client_credentials",
          }),
          {
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  state.client_id + ":" + state.client_secret
                ).toString("base64"),
            },
          }
        )
        .then(async (res) => {
          state.accessToken = res.data.access_token;
          return resolve(res);
        })
        .catch((err) => {
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
}

export default api;

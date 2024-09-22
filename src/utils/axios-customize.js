import axios from "axios";

// ===== Adding AXIOS with env vite ===== //
const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // for saving refresh_token into cookies
});

const handleRefreshToken = async () => {
    // console.log(">>> instance: ", instance);
    const res = await instance.get("/api/v1/auth/refresh");
    // console.log(">>> res: ", res);
    if (res && res.data) {
        return res.data.access_token;
    }
    return null;
}

const access_token = localStorage.getItem("access_token");
instance.defaults.headers.common = { "Authorization": `Bearer ${access_token}` }

// ===== Adding INTERCEPTOR ===== //
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response; // customize response while success
}, async function (error) {
    // console.log(">>> error: ", error);
    if (error.config && error.response && +error.response.status === 401) {
        // return updateToken().then((token) => {
        //   error.config.headers.xxxx <= set the token
        //   return axios.request(config);
        // });

        const access_token = await handleRefreshToken();
        // console.log(">>> access_token: ", access_token)
        if (access_token) {
            error.config.headers["Authorization"] = `Bearer ${access_token}`;
            localStorage.setItem("access_token", access_token);
            return axios.request(error.config);
        }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data ?? Promise.reject(error); // customize response while error
});

export default instance;
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

const NO_RETRY_HEADER = "x-no-retry";

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
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.config && error.response &&
        +error.response.status === 401 &&
        !error.config.headers[NO_RETRY_HEADER] // this flag to avoid axios retry infinity-loop
    ) {
        const access_token = await handleRefreshToken();
        error.config.headers[NO_RETRY_HEADER] = "true";
        if (access_token) {
            error.config.headers["Authorization"] = `Bearer ${access_token}`;
            localStorage.setItem("access_token", access_token);
            return instance.request(error.config);
        }
    }

    if (error.config && error.response &&
        +error.response.status === 400 &&
        error.config.url === "/api/v1/auth/refresh"
    ) {
        window.location.href = "/login";
    }
    return error?.response?.data ?? Promise.reject(error); // customize response while error
});

export default instance;
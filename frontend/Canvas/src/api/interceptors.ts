import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

const API_URL = "http://localhost:8080/api/v1";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!config.headers) {
        config.headers = {};
    }
    config.headers["Authorization"] = `Bearer ${token.access_token}`;
    config.headers["Content-Type"] = "application/json";
    config.baseURL = API_URL;

    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
        // Access Token was expired
        if (
            (error.response.status === 401 || error.response.status === 403) &&
            error.response.data.message === "jwt expired"
        ) {
            const storedToken = JSON.parse(localStorage.getItem("token"));

            try {
                const rs = await axios.post(`${API_URL}/auth/refresh`, {
                    oldToken: storedToken.refresh_token,
                });

                const { token } = rs.data;

                localStorage.setItem("token", JSON.stringify(token));
                // localStorage.setItem("user", JSON.stringify(user));

                return;
            } catch (_error) {
                return Promise.reject(_error);
            }
        }
    }
    return Promise.reject(error);
};

export const setupInterceptorsTo = (
    axiosInstance: AxiosInstance
): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};

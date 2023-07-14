import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

const API_URL = "http://localhost:8080/api/v1";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (!config.headers) {
        config.headers = {};
    }
    const token = localStorage.getItem("token");
    if (token) {
        console.log(token);

        config.headers["Authorization"] = `Bearer ${token}`;
    } else {
        config.headers["Authorization"] = "";
    }
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
            const storedToken = localStorage.getItem("token");

            try {
                const rs = await axios.post(`${API_URL}/auth/refresh`, {
                    oldToken: storedToken,
                });

                const { token } = rs.data.token;

                localStorage.setItem("token", token);

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

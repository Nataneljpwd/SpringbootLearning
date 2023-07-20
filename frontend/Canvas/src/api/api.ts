import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api/v1", headers: { 'Content-Type': 'application/json' } });

api.interceptors.response.use(
    response => response,
    async error => {
        if ((error.response.status === 401 || error.response.status === 403) && !error.config?.sent) {
            // we try to refresh the token
            let token = await axios.post("http://localhost:8080/api/v1/auth/refresh", { oldToken: localStorage.getItem("token") })
                .then(res => res.data.token);
            if (token) {
                error.config.headers = {
                    ...error.config.headers,
                    Authorization: `Bearer ${token}`
                }
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            return axios(error.config)
        }
    }
)
api.interceptors.request.use(
    config => {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        return config
    }
)
export const useApi = () => api;

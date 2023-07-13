import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const api = setupInterceptorsTo(
    axios.create({
        baseURL: "http://localhost:8080/api/v1",
        headers: {
            "Content-Type": "application/json",
        },
    })
);

export default api;

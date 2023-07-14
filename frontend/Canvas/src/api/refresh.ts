import axios from "axios";

export default async function refresh(): Promise<string> {
    let newToken = await axios.post("/auth/refresh", {
        oldToken: localStorage.getItem("token"),
    });
    return Promise.resolve(newToken.data.token);
}

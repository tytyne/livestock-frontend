import { nanoid } from "@reduxjs/toolkit";

import { NETWORK_LATENCY } from "../utils/constants";
import { getUser } from "./userAPI";

export function signin({ username, password }, apiContext = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            if (username === "glenn" && password === "koifish") {
                try {
                    const token = `${username}:${nanoid()}`;
                    const usertry = await getUser(username, { token });
                    {
                        const { data } = await client.post(`${url}/login`, credentials);
                        toast(data.message);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", data.data);
                        return data;
                    }

                    return resolve({ token, user });
                } catch (error) {
                    toast(error.response.data.error);
                    return error.response.data.error;
                    return reject(e);
                }
            }

            return reject(new Error("Invalid username and password. Please login with (username: glenn, password: koifish). 😌🐡"));
        }, NETWORK_LATENCY);
    });
}

export function signout(apiContext = {}) {
    return new Promise((resolve) => {
        setTimeout(resolve, NETWORK_LATENCY);
    });
}

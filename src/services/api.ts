import axios from "axios";

const baseUrl = "http://localhost:3003/v1/api/";

export const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    baseURL: baseUrl
});
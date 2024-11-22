const axios = require('axios');

const API_BASE_URL = "https://api.example.com";

async function post(endpoint, data) {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log("POST dto to:", url, "with data:", data);
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

async function put(endpoint, data) {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log("PUT dto to:", url, "with data:", data);
        const response = await axios.put(url, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

async function del(endpoint) {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log("DELETE dto to:", url);
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

async function get(endpoint) {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log("GET dto to:", url);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

function handleError(error) {
    if (error.response) {
        console.error("Error Response:", error.response.data);
        throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || "Unknown error"}`);
    } else if (error.request) {
        console.error("Error Request:", error.request);
        throw new Error("No response received from the API.");
    } else {
        console.error("Error Message:", error.message);
        throw new Error(`Error: ${error.message}`);
    }
}

module.exports = {get,post,put,del};
const axios = require("axios");

const REQUEST_URL = "https://pastecord.com/documents";
const DOC_URL = "https://pastecord.com/";

module.exports = class PastecordWrapper {
    async publish(body) {
        if (!body) {
            throw new ReferenceError("Invalid or no body!");
        }

        let result;
        try {
            result = await axios.post(REQUEST_URL, body);
        } catch (err) {
            throw new Error(err);
        }

        return {
            url: DOC_URL + result.data.key,
            key: result.data.key,
        };
    }
};

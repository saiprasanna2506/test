const http = require("http");

const TIMEOUT_MS = 500;

const fetchNumbers = (url) => {
    return new Promise((resolve) => {
        const req = http.get(url, (res) => {
            let data = "";
            res.on("data", chunk => { data += chunk; });
            res.on("end", () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData.numbers || []);
                } catch (error) {
                    resolve([]);
                }
            });
        });

        req.on("error", () => resolve([]));
        req.setTimeout(TIMEOUT_MS, () => {
            req.abort();
            resolve([]);
        });
    });
};

const fetchAndProcessNumbers = async (urls) => {
    const validUrls = urls.filter(url => {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    });

    const responses = await Promise.all(validUrls.map(url => fetchNumbers(url)));
    return [...new Set(responses.flat())].sort((a, b) => a - b);
};

module.exports = { fetchAndProcessNumbers };

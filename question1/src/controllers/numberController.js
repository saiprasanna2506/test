const { fetchAndProcessNumbers } = require("../services/numberService");

const getNumbers = async (req, res) => {
    try {
        const urls = req.query.url;
        if (!urls) {
            return res.status(400).json({ error: "No URLs provided" });
        }

        const urlArray = Array.isArray(urls) ? urls : [urls];
        const mergedNumbers = await fetchAndProcessNumbers(urlArray);
        
        return res.json({ numbers: mergedNumbers });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getNumbers };

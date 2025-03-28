const express = require("express");
const numberRoutes = require("./routes/numberRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/numbers", numberRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

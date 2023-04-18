const express = require("express");
const router = require("./routers/index");
const cors = require("cors");
const path = require("path");
const app = express();

const PORT = 8080;

// Body parser (Express 4.16+)
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

/**
 * Set up router
*/
router(app);

app.listen(PORT, () => {
    console.log("1.Server run success");
})
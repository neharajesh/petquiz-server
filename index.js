require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const { initializeDbConnection } = require("./config/db-setup")
initializeDbConnection();

const app = express();
app.use(bodyParser.json());
app.use(cors())
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.json({success: true, message: "Loaded successfully"})
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
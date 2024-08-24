// Import packages and assign variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection successful!");
});

const InventoryItemRouter = require("./routes/InventoryItems.js");
const ShowcaseRouter = require("./routes/Showcase.js");

app.use("/inventoryitem",InventoryItemRouter)
app.use("/showcase", ShowcaseRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port no ${PORT}`);
});
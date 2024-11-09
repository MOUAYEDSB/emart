const express = require("express");
const testRoute = require("./routes/testRoute");
const app = express();

// ...existing code...

app.use(testRoute);

// ...existing code...

module.exports = app;

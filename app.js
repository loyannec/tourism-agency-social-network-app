const express = require('express');
const app = express();
const port = 3000;
var mongoDB = require("./db/db-connection");
const loadRoutes = require("./routes");
require("./plugins")(app);

loadRoutes(app);

/*
Testing if start server
*/
const db = mongoDB(()=>{
console.log("Starting server");
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
})
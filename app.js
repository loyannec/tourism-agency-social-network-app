const express = require('express');
const app = express();
const port = 3000;
const locationRouter = require("./routes/location");
const detailsRouter = require("./routes/details");
const userRouter = require("./routes/user");

var mongoDB = require("./db/db-connection");
const loadRoutes = require("./routes");
require("./plugins")(app);

loadRoutes(app);
locationRouter(app);
detailsRouter(app);
userRouter(app);

/*
Testing if start server
*/
const db = mongoDB(()=>{
console.log("Starting server");
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
})

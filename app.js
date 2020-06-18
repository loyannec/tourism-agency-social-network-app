const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routesManager = require("./routes");
const port = process.env.port || 3000;
var mongoDB = require("./db/db-connection");
var fs = require('fs');
const locationRouter = require("./routes/location");
const detailsRouter = require("./routes/details");
const userRouter = require("./routes/user");

const db = mongoDB(()=>{    
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true })); 
    const handlebars = exphbs.create();
    app.engine("handlebars", handlebars.engine);
    app.set("view engine", "handlebars");

  // Register routes
    routesManager(app);
    locationRouter(app);
    detailsRouter(app);
    userRouter(app);

    console.log("Starting server");
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
});
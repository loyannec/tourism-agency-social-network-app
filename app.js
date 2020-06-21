const express = require("express");
const app = express();
const port = process.env.port || 3000;
const routesManager = require("./routes");

require("./plugins")(app);          // Plugins must be configure before routes!

setUser = require("./controllers/auth").setUser;     //must be before all routes and after pulgins !!
app.use(setUser);

//routesManager(app);
require("./routes")(app);

require("./db/db-connection")(() => {
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
});

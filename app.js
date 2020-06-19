const express = require("express");
const app = express();
const port = process.env.port || 3000;

require("./plugins")(app);          // Plugins must be configure before routes!
require("./routes")(app);

require("./db/db-connection")(() => {
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
});

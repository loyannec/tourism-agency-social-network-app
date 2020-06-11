const express = require('express');
const app = express();
const port = 3000;

const indexRouter = require("./routes/index");

require('./plugins/express.js')(app);
require('./plugins/cookie-parser')(app);
require('./plugins/livereload')(app);
require('./plugins/handlebars')(app);
require('./plugins/http-errors')(app);
require('./plugins/morgan')(app);

app.use("/", indexRouter);

/*
Testing if start server
*/
console.log("Starting server");
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

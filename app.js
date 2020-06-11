const express = require('express');
const app = express();
const port = 3000;

require('./plugins/express.js')(app);
require('./plugins/cookie-parser')(app);
require('./plugins/livereload')(app);
require('./plugins/handlebars')(app);
require('./plugins/http-errors')(app);

console.log("Starting server");
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

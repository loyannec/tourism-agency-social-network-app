const express = require('express');
const app = express();
const port = 3000;

require('./plugins/express.js')(app);

console.log("Starting server");
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
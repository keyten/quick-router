const express = require('express');
const quickRouter = require('./index');

// run express server
const app = express();
app.use(quickRouter());
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
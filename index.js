const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Assets
app.use(express.static('public'));

//Session
app.use(session({
    secret: '25467rfvfcgbfejzgw84755'
}))

//Routing
require('./routes/routes')(app);

//Error handling
app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(3000, function () {
    console.log('Hello :3000');
});
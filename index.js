const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('public'));

//Routing
require('./routes/routes')(app);

app.listen(3000, function () {
    console.log('Hello :3000');
});
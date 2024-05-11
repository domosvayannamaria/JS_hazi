const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/KI2J39', { useNewUrlParser: true });

module.exports = mongoose;
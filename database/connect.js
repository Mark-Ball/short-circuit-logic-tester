const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', error => console.log(error));
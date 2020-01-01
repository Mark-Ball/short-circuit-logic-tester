const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
require('dotenv').config();
require('./database/connect');
const app = express();

const hbs = exphbs.create({
    helpers: {
        incr: function(value) { return value + 1 }
    },
    defaultLayout: 'main'
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT, () => { console.log(`Listening on port ${process.env.PORT}`) });
const express = require('express');
const exphbs = require('express-handlebars')
const routes = require('./routes');
require('dotenv').config();
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(routes);

app.listen(process.env.PORT, () => { console.log(`Listening on port ${process.env.PORT}`) });
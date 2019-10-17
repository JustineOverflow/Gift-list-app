const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const errorController = require('./controllers/error');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/', homeRoutes);
// app.use(listRoutes);

app.use(errorController.useError);

app.listen(3000);
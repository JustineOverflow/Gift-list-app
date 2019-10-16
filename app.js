const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const listRoutes = require('./routes/list');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(listRoutes);

app.use((req, res, next) => {
    res.status(404).render('404.ejs', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
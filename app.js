const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const store = new SequelizeStore({db: sequelize});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
        proxy: true
    })
);

app.use('/admin', adminRoutes);
app.use('/', homeRoutes);
app.use(errorController.useError);

Promise.all([sequelize.sync(), store.sync()])
    .then(result => {
        app.listen(3000);
    })
    .catch(error => {
        console.log(error)
    });


const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getHome = (request, respond, next) => {
    respond.render('home.ejs', {
        pageTitle: "home",
        path: '/',
        isAuthenticated: false,
    });
};

exports.getLog = (request, respond, next) => {
    console.log(request.session.isLoggedIn);
    respond.render('login.ejs', {
        pageTitle: "login",
        path: '/login',
        isAuthenticated: false,
    });
};

exports.postLog = (request, respond, next) => {
    const email = request.body.email;
    const password = request.body.password;
    User.findOne({
       email : email,
    })
    .then(user => {
        if (!user) {
            return respond.redirect('/login');
        }
        bcrypt.compare(password, user.password)
            .then(doMatch => {
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.user = user;
                    return request.session.save(error => {
                        console.log(error);
                        respond.redirect('admin/myList');
                    });
                }
                respond.redirect('/login');
            })
            .catch(error => {
            console.log(error);
            respond.redirect('/login');
        });
    });
};

exports.postLogout = (request, respond, next) => {
    request.session.destroy(error => {
        console.log(error);
        respond.redirect('/');
    });
};

exports.getSign = (request, respond, next) => {
    respond.render('signup.ejs', {
        pageTitle: "signup",
        path: '/signup',
        isAuthenticated: false,
    });
};

exports.postSign = (request, respond, next) => {
    const email = request.body.email;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return respond.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                });
                return user.save();
            })
                .then(result => {
                    respond.redirect('/login');
                })
        })
        .catch(error => {
            console.log(error);
        });
};
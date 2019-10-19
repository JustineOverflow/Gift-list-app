exports.getHome = (request, respond, next) => {
        respond.render('home.ejs', {
                pageTitle: "home",
                path: '/',
        });
};

exports.getLog = (request, respond, next) => {
        respond.render('login.ejs', {
                pageTitle: "login",
                path: '/login',
        });
};

exports.getSign = (request, respond, next) => {
        respond.render('signup.ejs', {
                pageTitle: "signup",
                path:'/signup',
        });
};
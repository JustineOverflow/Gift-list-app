exports.getHome = (request, respond, next) => {
        respond.render('home.ejs', {
                pageTitle: "home",
                path: '/',
        });
};
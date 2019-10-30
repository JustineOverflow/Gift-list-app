exports. useError = (request, response, next) => {
    response.status(404).render('404.ejs', {
        pageTitle: 'Page Not Found',
        isAuthenticated : request.session.isLoggedIn,
    });
};
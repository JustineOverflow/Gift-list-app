module.exports = (request, respond, next) => {
    if (! request.session.isLoggedIn) {
        return respond.redirect('/login');
    }
    next();
};
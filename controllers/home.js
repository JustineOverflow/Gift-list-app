const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGripTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendGripTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY,
    }
}));

exports.getHome = (request, response, next) => {
    response.render('home.ejs', {
        pageTitle: "home",
        path: '/',
        isAuthenticated: false,
    });
};

exports.getLog = (request, response, next) => {
    console.log(request.session.isLoggedIn);
    response.render('login.ejs', {
        pageTitle: "login",
        path: '/login',
        isAuthenticated: false,
    });
};

exports.postLog = (request, response, next) => {
    const email = request.body.email;
    const password = request.body.password;

    User.findOne({
        where: {
            email: email,
        }
    })
        .then(user => {
            if (!user) {
                return response.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.user = user;
                        return request.session.save(error => {
                            console.log(error);
                            response.redirect('admin/myList');
                        });
                    } else {
                        return response.redirect('/login');
                    }
                })
                .catch(error => {
                    console.log(error);
                    response.redirect('/login');
                });
        });
};

exports.postLogout = (request, response, next) => {
    request.session.destroy(error => {
        console.log(error);
        response.redirect('/');
    });
};

exports.getSign = (request, response, next) => {
    response.render('signup.ejs', {
        pageTitle: "signup",
        path: '/signup',
        isAuthenticated: false,
    });
};

exports.postSign = (request, response, next) => {
    const email = request.body.email;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;
    User.findOne({where: {email: email}})
        .then(userDoc => {
            if (userDoc) {
                console.log(userDoc)
                return response.redirect('/signup');
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
                    response.redirect('/login');
                    return transporter.sendMail({
                        to: email,
                        from: 'justinefabre84@gmail.com',
                        subject: 'Gift app: Signup succeeded!',
                        html: '<h1>You successfully signed up! Thank you.</h1>'
                    });
                })
                .catch(error => {
                    console.log(error)
                });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getReset = (request, response, next) => {
    response.render('reset.ejs', {
        pageTitle: "password forgotten",
        path: '/reset',
        isAuthenticated: false,
    });
};

exports.postReset = (request, response, next) => {
    crypto.randomBytes(32, (error, buffer) => {
        if (error) {
            console.log(error);
            return response.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne
        ({
            where:
                {email: request.body.email}
        })
            .then(user => {
                if (!user) {
                    return response.redirect('/reset');
                }
                console.log(user);
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 360000;
                return user.save();
            })
            .then(result => {
                transporter.sendMail({
                    to: request.body.email,
                    from: 'justinefabre84@gmail.com',
                    subject: 'Gift app: Password reset',
                    html: '<p>You requested a password reset</p> <p> Click this <a href="http://localhost:3000/reset/${token}">link</a>to set a new password.</p>'
                })
                    .then(result => {
                        console.log(result)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            });
    })
};

exports.getNewPassword = (request, response, next) => {
    const token = request.params.token;
    User.findOne({
        where:
            {
                resetToken: token,
                resetTokenExpiration: {$gt: Date.now()}
            }
    })
        .then(user =>
            response.render('newPassword.ejs', {
                path: '/newPassword',
                userId: user.id.toString(),
                isAuthenticated: false,

                passwordToken: token,
            })
        )
        .catch(error => {
            console.log(error)
        });
};

exports.postNewPassword = (request, response, next) => {
    const newPassword = request.body.password;
    const userId = request.body.userId;
    const passwordToken = request.body.passwordToken;
    let resetUser;

    User.findOne({
        where: {
            resetToken: passwordToken,
            resetTokenExpiration: {$gt: Date.now()},
            _id: userId
        }
    })
        .then(user => {
            return bcrypt.hash(newPassword, 12)
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(result => {
            response.redirect('/login');
        })
        .catch(error => {
            console.log(error)
        })
};

exports.postDeleteUser = (request, response, next) => {
    const userId = request.body.userId;
    User.findByPk(userId)
        .then(user => {
            return user.destroy();
        })
        .then(result => {
            console.log('User deleted!');
            response.redirect('/home');
        })
        .catch(error => {
            console.log(error)
        });
};
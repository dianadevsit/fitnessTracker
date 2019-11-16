const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

//render login form
exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login to FitLiftLife' });
};

//render registration form
exports.registerForm = (req, res) => {
    res.render('register', { title: 'Register at FitLiftLife' });
};

//validate registration form data before submitting to database
exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        gmail_remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Confirmed password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Your passwords do not match!').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', { title: 'Register at FitLiftLife', body: req.body, flashes: req.flash() });
        return; //stop function run
    }
    next(); //no errors
};

//validate email id and check for duplicates
exports.validateEmail = async (req, res, next) => {
    const findEmail = await User.findOne({ email: req.body.email });
    if (findEmail) {
        req.flash('error', 'Email is already registered! Please log in.');
        res.render('login', { title: 'Login to FitLiftLife', flashes: req.flash() });
        return; // stop function run
    }
    next(); //no problem if email is unique
}

//register user
exports.register = async (req, res, next) => {
    const user = new User({ email: req.body.email, name: req.body.name });
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    next();
};

//render account editing form
exports.account = (req, res) => {
    res.render('account', { title: 'Edit Your Account' });
};

//update account on POST from form
exports.updateAccount = async (req, res) => {
    const updates = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );

    req.flash('success', 'Updated your account details!');
    res.redirect('back');
};
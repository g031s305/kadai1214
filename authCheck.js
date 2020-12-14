module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.session.error = 'login failed';
    res.redirect('/login');
};
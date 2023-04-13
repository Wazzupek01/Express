const isAuthorized = (req, res, next) => {
    if(req.body.password === "secretpaswd"){
        next();
    } else {
        res.status(401);
    }
}

module.exports = isAuthorized;
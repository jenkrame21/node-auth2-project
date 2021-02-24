
module.exports = (dept) => (req, res, next) => {
    if(req.decodedToken.dept === dept) {
        next();
    } else {
        res.status(403).json({
            message: "Administrative access only."
        });
    }
};
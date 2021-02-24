
module.exports = (department) => (req, res, next) => {
    if(req.decodedToken.department === department) {
        next();
    } else {
        res.status(403).json({
            message: "Administrative access only."
        });
    }
};
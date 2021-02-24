const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets.js");

const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

//| POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.

router.post("/register", (req, res) => {
    const credentials = req.body;

    if(isValid(credentials)) {
        // eslint-disable-next-line no-undef
        const rounds = process.env.BCRYPT_ROUND || 8;
        
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;

        Users.add(credentials)
            .then((user) => {
                res.status(201).json({
                    data: user
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: error.message
                });
            });
    } else {
        res.status(400).json({
            message: "Provide username and password. Password should be alphanumeric."
        });
    }
});

// | POST   | /api/login    | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeToken(user);

                    res.status(200).json({
                        message: "Welcome back, " + user.username,
                        token
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credentials!"
                    });
                }
            })
            .catch((error) => {
                res.status(500).json({
                    message: error.message
                });
            });
    } else {
        res.status(400).json({
            message: "Please provide username and password. Password should be alphanumeric."
        });
    }
});

function makeToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        dept: user.dept
    };
    const options = {
        expiresIn: "500s"
    };

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
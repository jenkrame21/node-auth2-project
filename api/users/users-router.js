const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const checkDept = require("../auth/check-dept-middleware.js");

// | GET    | /api/users    | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'.

router.get("/", restricted, checkDept("admin"), (req, res) => {
    Users.find()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            res.send({
                message: "YOU SHALL NOT PASS! " + error.message
            });
        });
});

module.exports = router;
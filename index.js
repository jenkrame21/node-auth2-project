require("dotenv").config();

const server = require("./api/server.js");

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n** Running on port ${port} **\n`);
});
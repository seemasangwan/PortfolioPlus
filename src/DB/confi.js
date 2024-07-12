
const bcrypt = require('bcryptjs');

const hardcodedUser = {
    username: process.env.SECRET_USERNAME,
    password: process.env.SECRET_PASSWORD
};

module.exports = {
    hardcodedUser
};
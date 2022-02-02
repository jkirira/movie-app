const { v1: uuidv1 } = require('uuid');

function User(username, email, password){
    this.id = uuidv1(),
    this.username = username,
    this.email = email,
    this.password = password
}

module.exports = User
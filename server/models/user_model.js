const { v1: uuidv1 } = require('uuid');

function User(username, password, email){
    this.id = uuidv1(),
    this.username = username,
    this.password = password,
    this.email = email
}

module.exports = User
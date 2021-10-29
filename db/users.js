const knex = require("./knex");

function createUser(user) {
    return knex("usuarios").insert(user);
}

function getUser(name) {
    return knex("usuarios").where("name", name)
}

module.exports = {
    createUser,
    getUser
}
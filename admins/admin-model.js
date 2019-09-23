const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  getAdmin
};

function find() {
  return db('admins');
}

function findById() {
    return db('admins').where({ id });
}

function getAdmin(id) {
  return db('users')
    .join("users.admin_id", "admins.id")
    .join("admins.school_id", "schools.id")
    .select("users.first_name", "users.last_name", "users.email", "users.username", "schools.school_name")
    .where({ admin_id })
}
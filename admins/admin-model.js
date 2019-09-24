const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  getAdmin,
};

function find() {
  return db('admins');
}

function findById() {
  return db('admins').where({ id });
}

function getAdmin(id) {
  return db('admins as a')
    .select("u.first_name", "u.last_name", "u.email", "u.username")
    .join("users as u", "u.admin_id", "a.id")
    .where({ admin_id: id})
    .first();
}
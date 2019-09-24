const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  getAdmin,
  updateAdmin,
  saveSchool
};

function find() {
  return db('admins');
}

function saveSchool(school) {
    return db('admins')
    .insert(school)
}

function findById() {
  return db('admins').where({ id });
}

function getAdmin(id) {
  return db('admins as a')
    .select("u.first_name", "u.last_name", "u.email", "u.username", "a.id", "a.school_id")
    .join("users as u", "u.admin_id", "a.id")
    .where({ admin_id: id})
    .first();
}

function updateAdmin(changes, id) {
  return db('admins')
    .where({id})
    .update(changes);
}
const db = require('../database/dbConfig.js');

module.exports = {
  getAdminsAtSchool
};

function getAdminsAtSchool(id){
    return db('admins as a')
    .select('s.school_name', 's.location', 's.id', 'a.school_id')
    .select("u.first_name", "u.last_name", "u.email", "u.username", "a.id", "a.school_id")
    .join("schools as s", "s.id", "a.school_id")
    .join("users as u", "u.admin_id", "a.id")
    .where({school_id: id});
}
const db = require('../database/dbConfig.js');

module.exports = {
  getAdminsAtSchool
};

function getAdminsAtSchool(school_id){
    return db('admins').where({school_id});
}
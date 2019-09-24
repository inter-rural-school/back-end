const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  getBoard
};

function find() {
  return db('boards');
}

function findById() {
    return db('boards').where({ id });
}

function getBoard(id) {
  return db('boards as b')
    .select("u.first_name", "u.last_name", "u.email", "u.username")
    .join("users as u", "u.board_id", "b.id")
    .where({ board_id: id})
    .first();
}
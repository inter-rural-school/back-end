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
  return db('users')
    .innerJoin("users.board_id", "boards.id")
    .select("users.first_name", "users.last_name", "users.email", "users.username")
    .where({ board_id: id })
}
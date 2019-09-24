const db = require('../database/dbConfig.js');

module.exports = {
  getBoards,
  getBoard
};

function getBoards() {
  return db('boards');
}

function getBoard(id) {
  return db('boards as b')
    .select("u.first_name", "u.last_name", "u.email", "u.username", "b.id")
    .join("users as u", "u.board_id", "b.id")
    .where({ board_id: id})
    .first();
}
const express = require('express');

const Boards = require('./board-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    Boards.find()
        .then(boards => {
            res.status(200).json(board);
            console.log(boards)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not get admins from server'});
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Boards.getBoard(id)
    .then(board => {
      if (board) {
        res.status(200).json(board);
      } else {
        res.status(404).json({ message: 'This user does not exist' })
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to get admin' });
    });
});


module.exports = router;
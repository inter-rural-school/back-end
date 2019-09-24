const express = require('express');

const Admins = require('./admin-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    Admins.find()
        .then(admins => {
            res.status(200).json(admins);
            console.log(admins)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not get admins from server'});
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Admins.getAdmin(id)
    .then(admin => {
      if (admin) {
        res.status(200).json(admin);
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
const express = require('express');

const Auth = require('./auth-admin-model.js');
const restricted = require("../auth/restricted-middleware.js");
const router = express.Router();

router.get('/admins', (req, res) => {
    Auth.find()
        .then(admins => {
            res.status(200).json(admins);
            console.log(admins)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not get admins from server'});
        });
});

router.get('/admins/:id', restricted, (req, res) => {
    const { id } = req.params;
  
    Auth.getAdmin(id)
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

router.put('/admins/:id', restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Auth.getAdmin(id)
  .then(admin => {
    if (admin) {
      Admins.updateAdmin(changes, id)
      .then(updatedAdmin => {
        res.status(200).json(updatedAdmin);
      })
    } else {
      res.status(404).json({ message: 'This user does not exist' })
    }
  })
  .catch(err => {
      console.log(err)
    res.status(500).json({ message: 'Failed to get admin' });
  });
});

router.get('/schools/:schoolid', (req, res) => {
  const {schoolid} = req.params;
  Auth.findBySchoolId(schoolid)
  .then(school => {
      if (school) {
          res.status(200).json(school)
      } else {
          res.status(404).json({message: "School with this id does not exist"})
      }

  })
  .catch(err => {
      res.status(500).json({error: "Error getting school from database"})
  })
});

router.get('/schools', restricted, (req, res) => {
  Auth.getSchools()
      .then(schools => {
          res.status(200).json(schools);
          console.log(schools)
      })
      .catch(err => {
          res.status(500).json({error: 'Could not get schools from server'});
      });
});

module.exports = router;
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

router.get('/:school_id', (req, res) => {
    const { school_id } = req.params;
    Admins.getAdminsAtSchool(school_id)
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

module.exports = router;
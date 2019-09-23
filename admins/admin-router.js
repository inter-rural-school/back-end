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
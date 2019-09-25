const express = require('express');

const Comments = require('./comment-model.js');
const restricted = require("../auth/restricted-middleware.js");
const router = express.Router();

router.get('/', restricted, (req,res) => {
    Comments.getComment()
    .then(comment => {
        res.status(200).json(comment)
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to get comment on issue' });
    });
})

router.post('/', restricted, (req, res) => {
    const comment = req.body;
    Comments.createComment( comment)
        .then(comment => {
            res.status(201).json(comment);
        })
        .catch (err => {
        res.status(500).json({ message: 'Failed to create new comment on issue' });
        });
})

module.exports = router;
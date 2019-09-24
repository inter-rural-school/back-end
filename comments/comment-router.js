const express = require('express');

const Comments = require('./comment-model.js');
const router = express.Router();

router.post('/', (req, res) => {
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
const express = require('express');

const Comments = require('./comment-model.js');
const Issues = require('../issues/issue-model.js');
const restricted = require("../auth/restricted-middleware.js");
const router = express.Router();

router.get('/', (req,res) => {
    Comments.getComment()
    .then(comment => {
        res.status(200).json(comment)
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to get all comments and issues' });
    });
})

router.get('/:id', (req,res) => {
    const {id} = req.params;
    Comments.getCommentById(id)
    .then(comment => {
        res.status(200).json(comment)
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to get comment on issue' });
    });
})

router.post('/', (req, res) => {
    const comment = req.body;
    Comments.createComment( comment)
        .then(commentids => {
            console.log(commentids);
            Issues.editIssue({comment_id: commentids[0]}, comment.issue_id)
            .then(update => {
                res.status(201).json(update);
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update issue' });
            })
        })
        .catch (err => {
        res.status(500).json({ message: 'Failed to create new comment on issue' });
        });
})

module.exports = router;
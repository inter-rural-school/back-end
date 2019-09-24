const express = require('express');

const Issues = require('./issue-model.js');
const Comments = require('../comments/comment-model.js');
const router = express.Router();

router.post('/', (req, res) => {
    const issue = req.body
  
    Issues.createIssue(issue)
    .then(issue => {
        res.status(201).json(issue);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new school issue' });
    });
});

router.get('/', (req, res) => {
    Issues.getAllIssues()
        .then(issues => {
            res.status(200).json(issues);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not get issues from server'});
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Issues.getAnIssues(id)
    .then(issues => {
        if (issues) {
            res.status(200).json(issues)
        } else {
            res.status(404).json({message: "School with this id does not exist"})
        }

    })
    .catch(err => {
        res.status(500).json({error: "Error getting issues from database"})
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Issues.editIssue(changes, id)
    .then(issue => {
      if (issue) {
          res.status(200).json(issue);
      } else {
        res.status(404).json({ message: 'This issue does not exist' })
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to get issue from database' });
    });
});
module.exports = router;
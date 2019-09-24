const express = require('express');

const Issues = require('./issue-model.js');
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

router.get('/:school_id', (req, res) => {
    const {school_id} = req.params;
    Issues.getSchoolIssues(school_id)
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
  
    Admins.getAdmin(id)
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

module.exports = router;
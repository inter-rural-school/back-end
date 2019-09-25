const db = require('../database/dbConfig.js');
const Comments = require('../comments/comment-model.js');

module.exports = {
  createIssue,
  getAllIssues,
  getAnIssues,
  editIssue,
  insert,
  removeIssue
};

//Admins should be able to create issues
function createIssue( issue) {
  return db('issues').insert(issue);
}

//Board members should see this
function getAllIssues() {
  return db('issues');
}

//Admins should see this
function getAnIssues(id) {
    return db('issues').where({id}).first();
}

function editIssue(changes, id) {
    return db('issues')
    .where({ id })
    .update(changes);
}

function getById(id) {
    const issueQuery = db('issues').where({id}).first();
    return Promise.all([issueQuery, Comments.getIssueById(id)])
        .then(([issue, comments]) => {
            issue.comments =comments;
            return issue;
        });
}

function insert (issue){
    return db('issues')
    .insert(issue, 'id')
    .then(([id]) => getById(id));
}
  
function removeIssue(id) {
  return db("issues")
    .where({ id })
    .del();
}
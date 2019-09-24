const db = require('../database/dbConfig.js');

module.exports = {
  createIssue,
  getAllIssues,
  getSchoolIssues,
  updateIssue
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
function getSchoolIssues(school_id) {
    return db('issues').where({ school_id });
}


//Board member should be able to update school issue status, and add a comment
function updateIssue(changes, comment_id) {
    return db('issues')
      .innerJoin('comments', "issues.comment_id", "comments.id")
      .select("issues.status", "comments.comment")
      .where({id: comment_id})
      .update(changes);
}
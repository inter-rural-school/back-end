exports.up = function(knex) {
    return knex.schema.createTable("comments", comments => {
      comments.increments();

      comments.string("comment").notNullable();
      comments
        .integer("issue_id")
        .unsigned()
        .references('id')
        .inTable('issues')
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      comments
        .integer("board_id")
        .unsigned()
        .references('id')
        .inTable('boards')
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("comments");
};
exports.up = function(knex) {
    return knex.schema.createTable("users", users => {
      users.increments();
  
      users.string("first_name", 120).notNullable();
      users.string("last_name", 120).notNullable();
      users
        .string("email")
        .notNullable()
        .unique();
      users
        .string("username", 255)
        .notNullable()
        .unique();
      users.string("password", 255).notNullable();
      users.boolean("isBoardMember").notNullable();
      users
        .integer("admin_id")
        .unsigned()
        .nullable()
        .references('id')
        .inTable('admins')
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      users
        .integer("board_id")
        .unsigned()
        .nullable()
        .references('id')
        .inTable('boards')
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
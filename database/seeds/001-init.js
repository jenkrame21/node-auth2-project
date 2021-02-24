exports.seed = function (knex) {
  const departments = [
    {
      name: "admin",
    },
    {
      name: "user",
    },
  ];

  return knex("departments")
    .insert(departments)
    .then(() => console.log("\n== Seed data for departments table added. ==\n"));
};

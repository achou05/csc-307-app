import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// Initial in-memory user list
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// ---- Helper functions ----
const findUserByName = (name) =>
  users["users_list"].filter((user) => user["name"] === name);

const findUserByNameAndJob = (name, job) =>
  users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index === -1) return false;
  users["users_list"].splice(index, 1);
  return true;
};

// ---- Routes ----

// Hello World
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all users, or filter by name/job
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    let result = findUserByNameAndJob(name, job);
    return res.send({ users_list: result });
  }

  if (name) {
    let result = findUserByName(name);
    return res.send({ users_list: result });
  }

  res.send(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// Add new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd); // 201 Created
});

// Delete user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const success = deleteUserById(id);

  if (!success) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send(); // 204 No Content
  }
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

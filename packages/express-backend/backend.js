import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// port and app setup
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// connets to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// schema and models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  job: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

//routes

// hello world
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// gets user with filters
app.get("/users", async (req, res) => {
  const { name, job } = req.query;

  try {
    let users;
    if (name && job) {
      users = await User.find({ name: name, job: job });
    } else if (name) {
      users = await User.find({ name: name });
    } else if (job) {
      users = await User.find({ job: job });
    } else {
      users = await User.find();
    }
    res.send({ users_list: users });
  } catch (err) {
    res.status(500).send("Error fetching users.");
  }
});

// gets the user by id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("Resource not found.");
    res.send(user);
  } catch (err) {
    res.status(500).send("Error fetching user by ID.");
  }
});

// post the users
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(400).send("Error creating user.");
  }
});

// deletes the user by id
app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Resource not found.");
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Error deleting user.");
  }
});

// starts the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

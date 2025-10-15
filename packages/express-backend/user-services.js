import User from "./user.js";

// get all users
export function getAllUsers() {
  return User.find();
}

// get users by name
export function getUsersByName(name) {
  return User.find({ name: name });
}

// get users by job
export function getUsersByJob(job) {
  return User.find({ job: job });
}

// get users by both name & job
export function getUsersByNameAndJob(name, job) {
  return User.find({ name: name, job: job });
}

// get user by ID
export function getUserById(id) {
  return User.findById(id);
}

// add new user
export function addUser(userData) {
  const user = new User(userData);
  return user.save();
}

// delete user by ID
export function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

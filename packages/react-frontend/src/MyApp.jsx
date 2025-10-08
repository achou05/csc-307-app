import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => console.log("Error fetching users:", error));
}, []);

  function removeOneCharacter(index) {
  const id = characters[index].id;
  fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" })
    .then((res) => {
      if (res.status === 204) {
        setCharacters(characters.filter((_, i) => i !== index));
      } else {
        console.log("Delete failed with status:", res.status);
      }
    })
    .catch((error) => console.log(error));
  }

  function updateList(person) {
  fetch("http://localhost:8000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      } else {
        throw new Error("Failed to add user");
      }
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]);
    })
    .catch((error) => console.log(error));
  }

  function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

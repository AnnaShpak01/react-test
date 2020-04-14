import React, { useState, useEffect } from "react";
import "../bootstrap/dist/css/bootstrap.css";
import "../styles/styles.css";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import UserDetail from "./UserDetail";

/**
  Instructions

  1 Fetch the users from api - https://jsonplaceholder.typicode.com/users
  2 Display the users in a list (`Name - Email` or similar)
  3 Add the feature to search through users from search box by name.
    - Search should filter upon change in the input
  4 Add the feature to clear the search box and reset the user list to show all
  5 Add the feature that, when a user is clicked, display the that users info as a selected user

  Please use all resources you want to, this is a fully open-book
  challenge. Google away.

  Don't be overly concerned with error handling, etc. This is a small evaluation.
  Feel free to add dependencies to the left if you need them.
**/

const API = "https://jsonplaceholder.typicode.com/users";

export default function App() {
  
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [activeId, setActiveId] = useState(0);

  const toFilterUsers = (newFilterText) => {
    setFilterText(newFilterText);
  }

  const changeActive = (newIndex) => {
    setActiveId(newIndex);
  }

  const loadData = async () =>{
    const response = await fetch(API);
    const responseJson = await response.json();
    setUsers(responseJson);
  }

  useEffect(() => {
    loadData();
  }, []);

    return (
      <div className="container mt-5">
        <SearchBar toFilterUsers={toFilterUsers} />
        <UserList changeActive={changeActive} 
                  users={users.filter(user => { return user.name.toLowerCase().includes(filterText.toLowerCase())})} />
        <UserDetail user={users.find(user => user.id === activeId)}
        />
      </div>
    );
}
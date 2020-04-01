import React from "react";
import "./bootstrap/dist/css/bootstrap.css"
import "./styles.css";

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

function UserComponent() {
  return (
    <div className="container mt-5">
      <h2>Search Users</h2>
      <div className="input-group mb-5 mt-3">
        <div className="input-group-prepend">
          <button type="button" className="input-group-text">
            <span>X</span>
          </button>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search Users"
        />
      </div>
      <div>
        <h4>Users</h4>
        <ul className="list-group">
          <li className="list-group-item">
            Jane Doe - <em>jane.doe@example.com</em>
          </li>
        </ul>
      </div>
      {/* show selected user info here */}
    </div>
  );
}

export default function App() {
  return <UserComponent />;
}



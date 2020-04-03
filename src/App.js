import React, { useState, useEffect } from "react";
import "./bootstrap/dist/css/bootstrap.css";
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

const API = "https://jsonplaceholder.typicode.com/users";

function UserDetail({user}){
  
  if (user === undefined) {
    return null;
  } 
  return (
    <div>
      <h4 className="mt-5">Information about active user</h4>
      <div className="detail-block">
        <div>
          <span>Name: </span>
          {user.name}
        </div>
        <div>
          <span>Username: </span>
          {user.username}
        </div>
        <div>
          <span>E-mail: </span>
          {user.email}
        </div>
        <div>
          <span>Address: </span>
          <div className="tab-list">
            <div>
              <span>Street: </span>
              {user.address.street}
            </div>
            <div>
              <span>Suite: </span>
              {user.address.suite}
            </div>
            <div>
              <span>City: </span>
              {user.address.city}
            </div>
            <div>
              <span>Zip Code: </span>
              {user.address.zipcode}
            </div>
            <div>
              <span>Geo: </span>
              <div className="tab-list">
                <div>
                  <span>Lat: </span>
                  {user.address.geo.lat}
                </div>
                <div>
                  <span>Lng: </span>
                  {user.address.geo.lng}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span>Phone: </span>
          {user.phone}
        </div>
        <div>
          <span>Website: </span>
          {user.website}
        </div>
        <div>
          <span>Company: </span>
          <div className="tab-list">
            <div>
              <span>Name: </span>
              {user.company.name}
            </div>
            <div>
              <span>Catch Phrase: </span> {user.company.catchPhrase}
            </div>
            <div>
              <span>Bs: </span> {user.company.bs}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  

}

function UserRow({user,changeActive}) {
    
  return (
    <li
      key={user.id}
      className="list-group-item"
      onClick={() => changeActive(user.id)}
    >
      <span>{user.name} </span> -<em> {user.email}</em>
    </li>
  );
  
}

function UserList({users, changeActive}) {
  
  const renderUsers = (users) => {
    return users.map(user => (
      <UserRow
        user={user}
        key={user.name}
        changeActive={changeActive}
      />
    ));
  }

    return (
      <div>
        <h4>Users</h4>
        <ul className="list-group">{renderUsers(users)}</ul>
      </div>
    );
}

function SearchBar({toFilterUsers}) {

  const [inputState, setInput] = useState("");

  const onFilterTextChange = (e) => {
    toFilterUsers(e.target.value);
    setInput(e.target.value );
  }

  const onBtnClickHandler = () => {
    toFilterUsers("");
    setInput("");
  }

    return (
      <React.Fragment>
        <h2>Search Users</h2>
        <div className="input-group mb-5 mt-3">
          <div className="input-group-prepend">
            <button
              type="button"
              className="input-group-text"
              onClick={onBtnClickHandler}
            >
              <span>X</span>
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search Users"
            onChange={onFilterTextChange}
            value={inputState}
          />
        </div>
      </React.Fragment>
    );
}

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
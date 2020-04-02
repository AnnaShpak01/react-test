import React from "react";
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
    return <div />;
  } else {
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

}

class UserRow extends React.Component {
  render() {
    const user = this.props.user;

    return (
      <li
        key={user.id}
        className="list-group-item"
        onClick={() => this.props.changeActive(user.id)}
      >
        <span>{user.name} </span> -<em> {user.email}</em>
      </li>
    );
  }
}

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.renderUsers = this.renderUsers.bind(this);
  }
  renderUsers(users) {
    return users.map(user => (
      <UserRow
        user={user}
        key={user.name}
        changeActive={this.props.changeActive}
      />
    ));
  }

  render() {
    return (
      <div>
        <h4>Users</h4>
        <ul className="list-group">{this.renderUsers(this.props.users)}</ul>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputState: ""
    };
    this.onFilterTextChange = this.onFilterTextChange.bind(this);
    this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
  }

  onFilterTextChange(e) {
    this.props.toFilterUsers(e.target.value);
    this.setState({ inputState: e.target.value });
  }

  onBtnClickHandler() {
    this.props.toFilterUsers("");
    this.setState({ inputState: "" });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Search Users</h2>
        <div className="input-group mb-5 mt-3">
          <div className="input-group-prepend">
            <button
              type="button"
              className="input-group-text"
              onClick={this.onBtnClickHandler}
            >
              <span>X</span>
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search Users"
            onChange={this.onFilterTextChange}
            value={this.state.inputState}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      activeId: 0
    };
    this.changeActive = this.changeActive.bind(this);
    this.toFilterUers = this.toFilterUers.bind(this);
  }

  toFilterUers(filterText) {
    const users = this.state.users;
    const filtered = users.filter(user => {
      return user.name.toLowerCase().includes(filterText.toLowerCase());
    });
    this.setState({
      filteredUsers: filtered
    });
  }

  changeActive(newIndex) {
    this.setState({ activeId: newIndex });
  }

  async componentDidMount() {
    const response = await fetch(API);
    const responseJson = await response.json();
    this.setState({ users: responseJson, filteredUsers: responseJson });
  }

  render() {
    const users = this.state.users;
    const filteredUsers = this.state.filteredUsers;
    return (
      <div className="container mt-5">
        <SearchBar toFilterUsers={this.toFilterUers} />
        <UserList changeActive={this.changeActive} users={filteredUsers} />
        <UserDetail
          user={users.find(user => user.id === this.state.activeId)}
        />
      </div>
    );
  }
}
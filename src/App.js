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

class UserDetail extends React.Component {
  render() {
    const users = this.props.users;

    if (this.props.activeId === 0) {
      return <div />;
    } else {
      const user = users.filter(elem => elem.id === this.props.activeId)[0];
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
                  {user.address.zipcode}{" "}
                </div>
                <div>
                  <span>Geo: </span>
                  <div className="tab-list">
                    <div>
                      <span>Lat: </span>
                      {user.address.geo.lat}{" "}
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
                  <span>Bs: </span> {user.company.bs}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

class ProductRow extends React.Component {
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
  render() {
    const filterText = this.props.filterText;

    const rows = [];

    this.props.users.forEach(user => {
      if (user.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }

      rows.push(
        <ProductRow
          changeActive={this.props.changeActive}
          user={user}
          key={user.name}
        />
      );
    });

    return (
      <div>
        <h4>Users</h4>
        <ul className="list-group">{rows}</ul>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <input
        type="text"
        className="form-control"
        placeholder="Search Users"
        value={this.props.filterText}
        onChange={this.handleFilterTextChange}
        ref="myTestInput"
      />
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      isClear: false,
      users: [],
      activeId: 0
    };
    this.changeActive = this.changeActive.bind(this);
    this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  changeActive(newIndex) {
    this.setState({ activeId: newIndex });
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  onBtnClickHandler() {
    this.handleFilterTextChange("");
  }

  async componentDidMount() {
    const response = await fetch(API);
    const responseJson = await response.json();
    const activatedUsers = responseJson.map(dataItem => ({
      ...dataItem
      // ,
      // isActive: false
    }));
    this.setState({ users: activatedUsers });
  }

  render() {
    const { users } = this.state;
    return (
      <div className="container mt-5">
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
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
        </div>
        <UserList
          changeActive={this.changeActive}
          users={users}
          filterText={this.state.filterText}
        />
        <UserDetail users={users} activeId={this.state.activeId} />
      </div>
    );
  }
}


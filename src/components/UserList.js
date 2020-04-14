import React from "react";
import UserRow from "./UserRow";

export default function UserList({users, changeActive}) {
  
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
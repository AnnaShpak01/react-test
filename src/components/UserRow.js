import React from "react";

export default function UserRow({user,changeActive}) {
    
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
  
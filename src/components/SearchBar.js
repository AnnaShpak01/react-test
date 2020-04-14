import React, { useState } from "react";

export default function SearchBar({toFilterUsers}) {

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
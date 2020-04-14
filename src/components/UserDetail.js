import React from "react";

export default function UserDetail({user}){
  
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
  
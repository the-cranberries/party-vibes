import React from 'react'

const UserList = ({users}) => (
  <div className="guests">
    {users ? (
      <div>
        {/* <h1>People currently in room</h1> */}
        <div className="activeContainer">
          <h2 className="row">
            {users.map(user => (
              <div key={user.name} className="activeItem text-center col">
                <img src={user.picture} />
                <div className="username">{user.name}</div>
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
)

export default UserList

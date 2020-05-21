import React from 'react'

const UserList = ({users}) => (
  <div className="textContainer">
    {users ? (
      <div>
        {/* <h1>People currently in room</h1> */}
        <div className="activeContainer">
          <h2>
            {users.map(user => (
              <div key={user.name} className="activeItem">
                {user.name}
                <img src={user.picture} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
)

export default UserList

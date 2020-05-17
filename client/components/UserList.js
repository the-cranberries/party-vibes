import React from 'react'

const UserList = ({users}) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1>People currently in room</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({name}) => (
              <div key={name} className="activeItem">
                {name}
                <img src="pietro.jpg" />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
)

export default UserList

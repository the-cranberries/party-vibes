const {addUser, removeUser, getUser, getUsersInParty} = require('./users')

module.exports = io => {
  io.on('connection', socket => {
    console.log('user has connected', socket.id)

    socket.on('SEND_MESSAGE', ({author, message, room}) => {
      // console.log('DATAAAAAAAAAA', data)
      // io.emit('RECEIVE_MESSAGE', data)
      io.to(room).emit('RECEIVE_MESSAGE', {author, message})
    })

    socket.on('END_PARTY', function(data) {
      let roomUsers = getUsersInParty(data.room)
      roomUsers.forEach(user => removeUser(user.id))
      io.to(data.room).emit('LEAVE_PARTY', {})
    })

    socket.on('join', ({name, room, picture}, callback) => {
      const {error, user} = addUser({id: socket.id, name, room, picture})

      if (error) return callback(error)

      socket.join(user.room)
      console.log('ROOOMMMMM', user.room)

      // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast
        .to(user.room)
        .emit('message', {user: 'admin', text: `${user.name} has joined!`})

      io
        .to(user.room)
        .emit('roomData', {room: user.room, users: getUsersInParty(user.room)})

      callback()
    })

    socket.on('disconnect', () => {
      const user = removeUser(socket.id)
      console.log(`Connection ${socket.id} has left the building`)

      if (user) {
        // io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInParty(user.room)
        })
      }
    })

    socket.on('guestSignOut', () => {
      const user = removeUser(socket.id)
      console.log(`${socket.id} has left room`)

      if (user) {
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInParty(user.room)
        })
      }
    })
  })
}

// const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

// module.exports = io => {
//   io.on('connect', socket => {
//     socket.on('join', ({name, room}, callback) => {
//       const {error, user} = addUser({id: socket.id, name, room})

//       if (error) return callback(error)

//       socket.join(user.room)

//       socket.emit('message', {
//         user: 'admin',
//         text: `${user.name}, welcome to room ${user.room}.`
//       })
//       socket.broadcast
//         .to(user.room)
//         .emit('message', {user: 'admin', text: `${user.name} has joined!`})

//       io
//         .to(user.room)
//         .emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

//       callback()
//     })

//     socket.on('sendMessage', (message, callback) => {
//       const user = getUser(socket.id)

//       io.to(user.room).emit('message', {user: user.name, text: message})

//       callback()
//     })

//     socket.on('disconnect', () => {
//       const user = removeUser(socket.id)

//       if (user) {
//         io
//           .to(user.room)
//           .emit('message', {user: 'Admin', text: `${user.name} has left.`})
//         io
//           .to(user.room)
//           .emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
//       }
//     })
//   })
// }

// module.exports = io => {
//   io.on('connection', socket => {
//     console.log(`A socket connection to the server has been made: ${socket.id}`)

//     socket.on('disconnect', () => {
//       console.log(`Connection ${socket.id} has left the building`)
//     })
//   })
// }

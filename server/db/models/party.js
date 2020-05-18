const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Party = db.define('party', {
  accessCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // scheduledDate: {
  //   type: Sequelize.DATE,
  // },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  }
})

module.exports = Party

Party.generateSalt = function() {
  return crypto.randomBytes(4).toString('base64')
}

const setSalt = function() {
  Party.generateSalt()
}

Party.beforeCreate(setSalt)

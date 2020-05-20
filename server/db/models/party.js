const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Party = db.define('party', {
  accessCode: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // }
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

Party.beforeCreate((partyInstance, optionsObject) => {
  if (!partyInstance.accessCode) {
    partyInstance.accessCode = crypto.randomBytes(8).toString('base64')
  }
})

module.exports = Party

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
    const generateCode = () => {
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
      let accessCode = ''
      for (let i = 0; i < 8; i++) {
        let j =
          Math.floor(Math.random() * (Math.floor(35) - Math.ceil(0) + 1)) + 0
        accessCode += characters[j]
      }
      return accessCode
    }

    partyInstance.accessCode = generateCode()
  }
})

module.exports = Party

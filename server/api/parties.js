const router = require('express').Router()
const {User, Party, PartyUser} = require('../db/models')
module.exports = router

//GET / api / parties /: accessCode

router.get('/:accessCode', async (req, res, next) => {
  try {
    const party = await Party.findOne({
      where: {
        accessCode: req.params.accessCode
      }
    })

    const partyUser = await PartyUser.findOne({
      where: {
        partyId: party.id
      }
    })

    const user = await User.findByPk(partyUser.userId)

    party.dataValues.user = user

    console.log('party: ', party)

    if (!party) {
      console.log('No such code found:')
      res.status(401).send('Access code invalid')
    } else {
      // req.session.userName = req.body.name
      // req.session.party = req.body.accessCode
      // req.session.isGuestLogged = true
      // console.log(req.session)

      res.json(party)
    }
  } catch (err) {
    next(err)
  }
})

const router = require('express').Router()
const {User, Party, PartyUser} = require('../db/models')
module.exports = router

// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:userId/parties
router.get('/:userId/parties', async (req, res, next) => {
  try {
    const parties = await Party.findAll({
      include: [
        {
          all: true,
          where: {
            id: req.params.userId
          }
        }
      ]
    })

    // console.log(req.user.dataValues.id)

    res.json(parties)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/parties', async (req, res, next) => {
  const userId = req.params.userId

  try {
    const user = await User.findByPk(userId)

    if (user) {
      const party = await Party.create()
      const userParty = await PartyUser.create({
        partyId: party.id,
        userId: user.id
      })

      res.status(201).json(userParty)
    } else {
      res.status(401).send('user not found')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/parties', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const party = await Party.findOne()

    if (user) {
      await party.destroy()
    }
    res.status(200).json()
  } catch (err) {
    next(err)
  }
})

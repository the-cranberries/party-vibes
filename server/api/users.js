const router = require('express').Router()
const {User, Party, PartyUser} = require('../db/models')
module.exports = router

const authUser = (req, res, next) => {
  if (req.user) {
    if (req.user.dataValues.id === parseInt(req.params.userId, 10))
      return next()
  }

  res.status(403).send('access denied')
}

// path: /api/users/:userId
router.get('/:userId', authUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', authUser, async (req, res, next) => {
  const {profilePicture} = req.body
  const {userId} = req.params

  try {
    const user = await User.findByPk(userId)
    const updatedUser = await user.update({profilePicture})

    res.status(200).send(updatedUser)
  } catch (err) {
    next(err)
  }
})

// path: /api/users/:userId/parties
router.get('/:userId/parties', authUser, async (req, res, next) => {
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

router.post('/:userId/parties', authUser, async (req, res, next) => {
  const userId = req.params.userId

  try {
    const user = await User.findByPk(userId)

    if (user) {
      const party = await Party.create()
      await PartyUser.create({
        partyId: party.id,
        userId: user.id
      })

      res.status(201).json(party)
    } else {
      res.status(401).send('user not found')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/parties', authUser, async (req, res, next) => {
  try {
    const userParty = await PartyUser.findOne({
      where: {userId: req.params.userId}
    })

    if (userParty) {
      const partyId = userParty.partyId

      await Party.destroy({where: {id: partyId}})

      res.status(204).json()
    } else {
      res.status(401).send('party not found')
    }
  } catch (err) {
    next(err)
  }
})

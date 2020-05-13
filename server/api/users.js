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

    res.json(parties)
  } catch (err) {
    next(err)
  }
})

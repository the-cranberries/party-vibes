const router = require('express').Router()
const {Party} = require('../db/models')
module.exports = router

// GET /api/parties/:accessCode
router.get('/:accessCode', async (req, res, next) => {
  try {
    const party = await Party.findOne({
      where: {
        accessCode: req.params.accessCode
      }
    })
    if (party) {
      res.json(party)
    } else {
      res.json('INVALID')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:accessCode', async (req, res, next) => {
  try {
    const party = await Party.findOne({
      where: {
        accessCode: req.params.accessCode
      }
    })
    if (party) {
      res.json(party)
    } else {
      res.status(401).send('Access code invalid')
    }
  } catch (err) {
    next(err)
  }
})

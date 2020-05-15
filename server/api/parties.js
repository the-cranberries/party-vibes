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
    res.json(party)
  } catch (err) {
    next(err)
  }
})

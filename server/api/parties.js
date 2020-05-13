const router = require('express').Router()
const {Party} = require('../db/models')
module.exports = router

// GET /api/parties/:accessToken
router.get('/:accessToken', async (req, res, next) => {
  try {
    const party = await Party.findByPk(req.params.accessToken)
    res.json(party)
  } catch (err) {
    next(err)
  }
})

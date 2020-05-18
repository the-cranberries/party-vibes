const router = require('express').Router()
const {Party} = require('../db/models')
module.exports = router

//GET / api / parties /: accessCode
// router.get('/:accessCode', async (req, res, next) => {
//   try {
//     const party = await Party.findOne({
//       where: {
//         accessCode: req.params.accessCode
//       }
//     })
//     if (party) {
//       res.json(party)
//     } else {
//       res.json('INVALID')
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/:accessCode', async (req, res, next) => {
  try {
    const party = await Party.findOne({
      where: {
        accessCode: req.params.accessCode
      }
    })
    if (!party) {
      console.log('No such code found:')
      res.status(401).send('Access code invalid')
    } else {
      req.session.userName = req.body.name
      console.log(req.session)

      res.json(party)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // generate access code here?

    const party = await Party.create({
      userId: req.body.userId
    })
    res.json(party)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Party.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

const router = require('express').Router()
const session = require('express-session')
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
      //later we should make actual id
      session.userName = req.body.name
      console.log(session)

      res.json(party)
    }
  } catch (err) {
    next(err)
  }
})

// here be authentication routes
const router = require('express').Router()
const authService = require('../services/authService')

router.route('/login').post(async (req, res) => {
  try {
    const { email, password } = req.body;

    // get auth token
    const [authErr, authToken] = await authService.fetchAuthToken(email, password)
    if (authErr) {
      throw authErr
    }
    console.log('we have an authtoken: ', authToken)

    // not sure if we really need this
    // const tokenErr = await authService.insertAuthToken(authToken)
    // if (tokenErr) {
    //   throw tokenErr
    // }

    res.status(200).json(authToken)
  } catch (err) {
    // console.log(err, 'the err')
    res.status(500).json(err)
  }
})

router.route('/logout').get(async (req, res) => {

})

module.exports = router
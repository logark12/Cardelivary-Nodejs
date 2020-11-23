const {Router} = require('express')

const userRout = require('../controllers/userController')
const router = Router()

router.get('/signup', userRout.signup_get )
router.get('/login', userRout.login_get)
router.post('/signup', userRout.signup_post)
router.post('/login', userRout.login_post)
router.get('/logout', userRout.logout_get);

router.get('/faqs', userRout.faqs_get)


module.exports = router
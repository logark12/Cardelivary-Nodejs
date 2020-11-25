const {Router} = require('express')
const { UserRole } = require('../middleware/authmeddileware')

const userRout = require('../controllers/userController')
const router = Router()

router.get('/userRegistration',UserRole, userRout.userRegistration_get)
router.post('/userRegistration',UserRole, userRout.userRegistration_post)
router.get('/user/delete/:id',UserRole, userRout.userDelete)

// router.get('/signup', userRout.signup_get )
router.get('/login', userRout.login_get)
// router.post('/signup', userRout.signup_post)
router.post('/login', userRout.login_post)
router.get('/logout', userRout.logout_get);

router.get('/faqs',UserRole, userRout.faqs_get)


module.exports = router
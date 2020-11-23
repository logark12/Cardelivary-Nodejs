const router = require('express').Router();
const uploadController = require('../controllers/DriverController')

router.post('/add',uploadController.upload_post )

router.get('/',uploadController.form_get )
router.post('/update/:id', uploadController.updateDriver_post)
router.get('/update/:id', uploadController.updateDriver)
router.get('/detail/:id',uploadController.form_detail )
router.get('/delete/:id',uploadController.deleteDriver )


module.exports = router
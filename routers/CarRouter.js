const router = require('express').Router();
const uploadController = require('../controllers/CarController')

router.post('/add',uploadController.upload_post )

router.get('/',uploadController.form_get )
router.post('/update/:id', uploadController.updateDriver_post)
router.get('/update/:id', uploadController.updateDriver)
router.get('/detail/:id',uploadController.form_detail )
router.get('/delete/:id',uploadController.deleteDriver )

router.get('/assing', uploadController.Asing_Driver_get)
router.post('/assing', uploadController.Asing_Driver_post)

router.get('/assing/update/:id', uploadController.Asing_Driver_update_get)
router.post('/assing/update/:id', uploadController.Asing_Driver_update_post)

router.get('/assing/delete/:id', uploadController.Asing_Driver_delete)


module.exports = router
const router = require('express').Router();
const StoreController = require('../controllers/storeController')


router.get('/store',StoreController.Store_get)
router.get('/view-map',StoreController.view_map)
router.post('/store', StoreController.Store_register)

router.get('/edit/:id', StoreController.Store_update)
router.post('/edit/:id', StoreController.Store_set_update)
router.get('/store/delete/:id', StoreController.Store_delete)

module.exports = router
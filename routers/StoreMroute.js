const router = require('express').Router();
const StoreController = require('../controllers/storeController')
const { UserRole , isAdmin} = require('../middleware/authmeddileware')


router.get('/store',isAdmin,StoreController.Store_get)
router.get('/view-map',UserRole, StoreController.view_map)
router.post('/store',isAdmin, StoreController.Store_register)

router.get('/edit/:id',isAdmin, StoreController.Store_update)
router.post('/edit/:id',isAdmin, StoreController.Store_set_update)
router.get('/store/delete/:id',isAdmin, StoreController.Store_delete)

module.exports = router
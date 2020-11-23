const router = require('express').Router();
const reportCantroller = require('../controllers/repotCantroller')

router.get('/store', reportCantroller.reports_store_get)
router.get('/driver', reportCantroller.reports_driver_get)
router.get('/car', reportCantroller.reports_car_get)
router.get('/assign', reportCantroller.reports_assign_get)
router.get('/tasks', reportCantroller.reports_tasks_get)

module.exports = router
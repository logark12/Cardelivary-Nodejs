const Store = require('../models/Store')

exports.getStore =async (req, res, next) =>{
    try {
        const store = await Store.find()
        // console.log(store)

        res.status(200).json({
            success: true,
            cont: store.length,
            data: store
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server Error'})
    }
}


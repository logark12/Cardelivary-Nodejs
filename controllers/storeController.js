const Store = require('../models/Store')


module.exports.Store_get = async (req, res) =>{
    try{
        const stores = await Store.find()
        res.render('StoreM/store', {stores})
    }catch(err){
        console.log(err)
    }
    
}

module.exports.Store_register = async (req, res) => {
    
    try{
        const store = await Store.create(req.body)
        res.status(200).json({ store :store._id})
    }catch(err){
        console.log(err)
        res.send(400).json('error')
    }

};

module.exports.Store_delete = (req, res) => {
    const storeId = req.params.id
    console.log(storeId)
    Store.findByIdAndDelete(storeId)
    .then(result => {
        res.redirect('/store')
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports.Store_update = (req, res) => {
    const storid = req.params.id
    Store.findById(storid)
    .then(result => { 
        res.render('StoreM/edit', {Store_update: result})
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports.Store_set_update = async (req, res) => {
    console.log(req.body)
    try{
        const store = await Store.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).json({store :store._id })
    }catch(err){
        console.log(err)
    }
    
};

module.exports.view_map = (req, res) => {
    res.render('StoreM/view-map')
}
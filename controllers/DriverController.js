const Movie = require('../models/Driver');
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

module.exports.upload_get = async (req, res) => {
    try{
        const movie  = await Movie.find();
        res.render("index", {
          movie
        });
      }catch (err){
        console.log("err: "+ err); 
      }
};

module.exports.upload_post = async (req, res) => {
    // console.log(req.body)
    const {fullName, PhoneNumber, Address, ContectPersonName, ContactPersonPhone, img, img2} = req.body;
    const movie = new Movie({
        fullName,
        PhoneNumber,
        Address,
        ContectPersonName,
        ContactPersonPhone
    });

    // SETTING IMAGE AND IMAGE TYPES
    saveImage(movie, img, img2);
    
    try{
        const newMovie = await movie.save();
        console.log(newMovie);  
        res.redirect('/Driver')  ;
    }catch (err){
        console.log(err);    
    }
}

function saveImage(movie, imgEncoded, imgEncoded2) {
    // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
    if (imgEncoded == null) return;
  
    // ENCODING IMAGE BY JSON PARSE
    // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
    const img =  JSON.parse(imgEncoded);
    const img2 =  JSON.parse(imgEncoded2);
    console.log( "JSON parse: "+ img);
    
    // CHECKING FOR JSON ENCODED IMAGE NOT NULL 
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
    // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
    if (img != null && imageMimeTypes.includes(img.type)) {
  
      // https://nodejs.org/api/buffer.html
      // The Buffer class in Node.js is designed to handle raw binary data. 
      // SETTING IMAGE AS BINARY DATA
      movie.img = new Buffer.from(img.data, "base64");
      movie.imgType = img.type;
      movie.img2 = new Buffer.from(img2.data, "base64");
      movie.imgType2 = img2.type;
    }
  }

module.exports.form_get = async (req, res) => {
    try{
        const movie  = await Movie.find();
        res.render('driver/Driver', {
          movie
        });
      }catch (err){
        console.log("err: "+ err); 
      }
};

module.exports.form_detail = async (req, res) => {
    const id = req.params.id
    try{
        const movie  = await Movie.findById(id);
        res.render('driver/detail', {
          movie
        });
      }catch (err){
        console.log("err: "+ err); 
      }
};

module.exports.deleteDriver = (req, res) => {
    const id = req.params.id

    Movie.findByIdAndDelete(id)
    .then(result => {
        res.redirect('/Driver')
    })
    .catch(err => {
        console.log(err)
    })

};

module.exports.updateDriver = (req, res) => {
    const id = req.params.id
     
    Movie.findById(id)
    .then(result => {
        res.render('driver/edit', {movie : result})
    })
    .catch(err => {
        console.log(err)
    })
};

module.exports.updateDriver_post = async (req, res) => {
    // console.log(req.body.img2)
    const {fullName, PhoneNumber, Address, ContectPersonName, ContactPersonPhone, img, img2} = req.body;
    // SETTING IMAGE AND IMAGE TYPES
    // const movie = {
    //     fullName,
    //     PhoneNumber,
    //     Address,
    //     ContectPersonName,
    //     ContactPersonPhone
    // };
    // console.log(movie)
    saveImage(req.body, img, img2);
    try{
        const Mymovie = await Movie.findByIdAndUpdate(req.params.id,req.body);
        // res.status(201).json({movie :movie._id })
        res.redirect('/Driver')
    }catch(err){
        console.log(err)
    }
}

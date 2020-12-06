const Car = require('../models/Cars');
const Driver = require('../models/Driver')
const AssingDriver = require('../models/AssingDriver')

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
    // console.log(req.body.img2)
    const {carName, CarType, img, img2} = req.body;
    const car = new Car({
      carName,
      CarType
    });

    // SETTING IMAGE AND IMAGE TYPES
    saveImage(car, img, img2);
    
    try{
        const newMovie = await car.save();
        // console.log(newMovie);  
        res.redirect('/car')  ;
    }catch (err){
        console.log(err);    
    }
}

function saveImage(movie, imgEncoded, imgEncoded2) {
    // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
    if (imgEncoded == null && imgEncoded2 == null) return;
  
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
        const car  = await Car.find();
        res.render('cars/cars', {
          car
        });
      }catch (err){
        console.log("err: "+ err); 
      }
};

module.exports.form_detail = async (req, res) => {
    const id = req.params.id
    try{
        const car  = await Car.findById(id);
        res.render('cars/detail', {
          car
        });
      }catch (err){
        console.log("err: "+ err); 
      }
};

module.exports.deleteDriver = (req, res) => {
    const id = req.params.id

    Car.findByIdAndDelete(id)
    .then(result => {
        res.redirect('/car')
    })
    .catch(err => {
        console.log(err)
    })

};

module.exports.updateDriver = (req, res) => {
    const id = req.params.id
     
    Car.findById(id)
    .then(result => {
        res.render('cars/edit', {car : result})
    })
    .catch(err => {
        console.log(err)
    })
};

module.exports.updateDriver_post = async (req, res) => {
    // console.log(req.body.img)
    const {carName, CarType, img, img2} = req.body;
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
        const Mymovie = await Car.findByIdAndUpdate(req.params.id,req.body);
        // res.status(201).json({movie :movie._id })
        res.redirect('/car')
    }catch(err){
        console.log(err)
    }
};

module.exports.Asing_Driver_get = async (req, res) => {
  const car = await Car.find()
  const driver = await Driver.find()
  const AssingD = await AssingDriver.find()
  res.render('cars/AsignDrive', {driver, car, AssingD})
};

module.exports.Asing_Driver_post = async (req, res) => {
  console.log(req.body)
    try{
      const Assing = await AssingDriver.create(req.body);
      res.status(200).json({"success":"Asing Driver Hass Been Successfully"})
      res.redirect('/car/assing');
      
    }catch (err){
      const errors = ErrorHandler(err);
      
      res.status(400).json({errors});
    }
};

module.exports.Asing_Driver_update_get = async (req, res) => {
  const car = await Car.find()
  const driver = await Driver.find()
  const AssingD = await AssingDriver.findById(req.params.id)
  console.log(AssingD._id)
  res.render('cars/Asignedit', {driver, car, AssingD})
}

module.exports.Asing_Driver_update_post = async (req, res) => {
  try{
      const tasks = await AssingDriver.findByIdAndUpdate(req.params.id,req.body);
      // res.status(201).json({movie :movie._id })
      res.redirect('/car/assing')
    }catch(err){
        console.log(err)
    }
}

module.exports.Asing_Driver_delete = (req, res) => {
  const id = req.params.id

  AssingDriver.findByIdAndDelete(id)
    .then(result => {
      // res.status(200).json({"success":"You have Successfully Deleted"})
        res.redirect('/car/assing')
    })
    .catch(err => {
      
        console.log(err)
    })
}

// error HANDLLER

const ErrorHandler = (err) => {
  console.log(err.message)
  let errors = {Car: "", Driver: ""}

    if(err.code === 11000 && err.message.includes('Driver')){
        errors.Driver = 'the Driver Have Allrady a Car';
        console.log(errors)
        return errors;
    }
    if(err.code === 11000 && err.message.includes('Car')){
        errors.Driver = 'the Car Allrady Have a Driver';
        console.log(errors)
        return errors;
    }

    if (err.message.includes('AssignD validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
        
      });
      
    }
    
    return errors;
}
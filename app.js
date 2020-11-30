const express = require('express')
const mongoose = require('mongoose')
const cookeiParser = require('cookie-parser')
const bodyParser = require("body-parser");

const homeController = require('./controllers/homeController')

// importing routers
const storeMrouter = require('./routers/StoreMroute')
const userAuthRouts = require('./routers/userRouter')
const DriverRouter = require('./routers/DriverRoutes')
const CarRouts = require('./routers/CarRouter')
const taskRouoter = require('./routers/tasksRoute')
const reportRouter = require('./routers/repotRoute')
const homeRoute = require('./controllers/homeController')
// importing midlleware
const { requireAuth, checkUser, UserRole, isAdmin } = require('./middleware/authmeddileware')

const app = express()
app.use(express.static(__dirname + '/public'));
app.timeout = 0;
// midllewares

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));


app.use(express.json())
app.use(cookeiParser())

app.set('view engine', 'ejs')
// datebase connection
const dbURI = 'mongodb+srv://logark:@abdi1234@cardilivary.iqy83.mongodb.net/CarDilivary?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false })
  .then((result) => app.listen(process.env.PORT || 3000))
  .catch((err) => console.log(err));



// routes
app.get('*', checkUser)

app.get('/',[requireAuth, UserRole],  homeController.get_Home)

app.use(userAuthRouts)
app.use("/repots",UserRole, reportRouter)
app.use(storeMrouter )
app.use('/tasks', isAdmin, taskRouoter)
app.use('/Driver',isAdmin, DriverRouter)
app.use('/car',isAdmin, CarRouts )


app.use('/api/v1/places',UserRole, require('./routers/place'))
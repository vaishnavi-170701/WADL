var express = require('express')
var app = express()

var expressMongoDb = require('express-mongo-db');

var config = {
  database: {
    url: 'mongodb://localhost:27017/test'
  },
  server: {
    host: '127.0.0.1',
    port: '3000'
  }
}
app.use(expressMongoDb('mongodb://localhost:27017/test'));
app.set('view engine', 'ejs')
var index = require('./routes/index')
var users = require('./routes/users')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
var methodOverride = require('method-override')

/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */ 
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())

app.use('/', index)
app.use('/users', users)
// app.use('/age',users)


app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})

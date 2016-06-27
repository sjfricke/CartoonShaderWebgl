var express = require('express');
var http = require('http');
var path = require('path');  //grabs local path
var logger = require('morgan'); //logs in console
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser'); 

//var api = require('./routes/api');  
//var mongoose = require('mongoose');                         //add for Mongo support

//var mongoURI = "mongodb://127.0.0.1:27017/cs559";
//var MongoDB = mongoose.connect(mongoURI).connection;
//MongoDB.on('error', function(err) { console.log(err.message); });
//MongoDB.once('open', function() {
//  console.log("mongodb connection open");
//});

var app = express();


//---------------Middle Ware-------------------//


//view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

var jsURL;

//----------------File Management-------------//
//var fileCount = 0;
//------multer upload ------/
//var storage =   multer.diskStorage({
//  destination: function (req, file, callback) {
//    callback(null, './files/obj');
//  },
//  filename: function (req, file, callback) {
//    callback(null, file.originalname);
////    callback(null, fileCount++);
//  }
//});
//var upload = multer({storage: storage} );
//app.post('/upload/files', upload.array('webgl'), function(req,res){
//    
////    console.log(req.body);
//    console.log(req.files);
//    
//    var objFile = req.files[0].destination + "/" + req.files[0].filename;
//    
//    var mtlFile;
//    if (req.files.length > 1){
//        mtlFile = req.files[1].destination + "/" + req.files[1].filename;
//    } else {
//        mtlFile = false;
//    }
//    
//     
//    var outputFile = 'files/js/' + Date.now() + '.js';
//    
//    
//    console.log(objFile);
//    console.log( mtlFile);
//    console.log(outputFile);
//    console.log(req.body.arrayName);
//    
//    parser.parser(objFile, mtlFile, outputFile ,req.body.arrayName, function(data){
//        if (data == 1) {
//            console.log("YAY");        
//            res.send(outputFile);
////            res.send("files/js?file=" + outputFile.substr(11));
//        } else {
//            res.send("ERROR");            
//        }
//        
//    });
//       
//    
//
//    
//});




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//---------------Grabs index.html-------------------//
app.use(express.static(path.join(__dirname, 'source')));


//---------------API-------------------//

//
//app.use('/api', api);


app.get('/', function(req, res, next) {
  res.render('index');
});

//app.get('/files/js', function(req, res, next) {
//    res.sendFile(path.join(__dirname, 'files/js/' + req.param('file')))
//});

//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err); 
//});
//
//// error handlers
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//});



// ------------ Server Setup --------------//


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}



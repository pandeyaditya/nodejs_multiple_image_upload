// var express = require('express'),
//     path = require('path'),
//     fs = require('fs'),
//     formidable = require('formidable'),
//     readChunk = require('read-chunk'),
//     fileType = require('file-type');
	
// var app = express();
// app.set('port', (process.env.PORT || 4800));

// // Tell express to serve files from the directories
// app.use(express.static('public'));
// app.use('/uploads', express.static('uploads'));

// // index route
// app.get('/', function (req, res) {
//     var filesPath = path.join(__dirname, 'uploads/');
//     fs.readdir(filesPath, function (err, files) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         files.forEach(function (file) {
//             fs.stat(filesPath + file, function (err, stats) {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 var createdAt = Date.parse(stats.ctime),
//                     days = Math.round((Date.now() - createdAt) / (1000*60*60*24));

//                 if (days > 1) {
//                     fs.unlink(filesPath + file);
//                 }
//             });
//         });
//     });
//     res.sendFile(path.join(__dirname, 'views/index.html'));
// });

// // Upload photos 
// app.post('/upload_photos', function (req, res) {
//     var photos = [],
//         form = new formidable.IncomingForm();
//     form.multiples = true;
//     form.uploadDir = path.join(__dirname, 'tmp_uploads');
//     form.on('file', function (name, file) {        
// 		var buffer = null,
//             type = null,
//             filename = '';
//         buffer = readChunk.sync(file.path, 0, 262);
//         type = fileType(buffer);
//         // Check the file type as it must be either png,jpg or jpeg
//         if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
//             filename = Date.now() + '-' + file.name;
//             fs.rename(file.path, path.join(__dirname, 'uploads/' + filename));
//             photos.push({
//                 status: true,
//                 filename: filename,
//                 type: type.ext,
//                 publicPath: 'uploads/' + filename
//             });
//         } else {
//             photos.push({
//                 status: false,
//                 filename: file.name,
//                 message: 'Invalid file type'
//             });
//             fs.unlink(file.path);
//         }
//     });
//     form.on('error', function(err) {
//         console.log('Error occurred during processing - ' + err);
//     });
//     form.on('end', function() {
//         console.log('All the request fields have been processed.');
//     });
//     form.parse(req, function (err, fields, files) {
//         res.status(200).json(photos);
//     });
// });
// app.listen(app.get('port'), function() {
//     console.log('Express started at port ' + app.get('port'));
// });


// ########################################################################
// New Multi Upload code from : 

var express = require('express');
var multer = require('multer');
var app = express();
var port = 5000;

app.set('port', port); 

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'C:/xampp/htdocs/multiple_file_upload_nodejs/uploads');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

/* In the below line you will have an array of photos files. request.files is an object where fieldname is the key and value is the array of files */ 

var upload = multer({storage: storage}).array('photo', 5);

app.get('/', function(resuest, response) {
  response.sendFile('C:/xampp/htdocs/multiple_file_upload_nodejs/index.html');
});

app.post('/upload', function(request, response) {
  upload(request, response, function(err) {
    if(err) {
      console.log(err);
      console.log('Error Occured');
      return;
    }
    // request.files is an object where fieldname is the key and value is the array of files 
    console.log(request.files);
    response.end('Your Files Uploaded');
    console.log('Photo Uploaded');
  })
});

var server = app.listen(port, function () {
  console.log('Listening on port ' + server.address().port)
});
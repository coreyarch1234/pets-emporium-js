var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var router = express.Router();
var Pet = require('../models/pet');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//   }
// });

// var upload = multer({ storage: storage }).single('avatar');

// PETS NEW
router.get('/new', function(req, res, next) {
  res.render('pets-new');
});

// PETS SHOW
router.get('/:id', function(req, res, next) {
  Pet.findById(req.params.id).populate('comments').exec(function (err, pet) {

    res.render('pets-show', { pet: pet });
  });
});


// CREATE POST
router.post('/', upload.single('avatar'), function(req, res, next) {
  var pet = new Pet(req.body);
  console.log(req.body);
  console.log(req.file)

  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
    }

    pet.save(function (err) {
      if (err) { return res.status(400).send(err) }

      res.send(pet);
    });

    res.json({
        success: true,
        message: "image uploaded "
    })
});

});

module.exports = router;

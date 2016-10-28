var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/sherk');

/*
  pic schema
  -----------
  var pic = {
    imageSegments: 3,
    players: ['123', '125', '1334'],
    completedImage: '12343242ef123213ab234210',
    subImages: [
      {
        imageData: '2314213defffwqfwef',
        nextImage: '321f43f344444444'
      },
      {
        imageData: '23421342dddasdas223',
        nextImage: '321fwerwqer4444'
      },
      {
        imageData: '1234234321dsasd232',
        nextImage: null
      }
    ]
  }
*/

var playerSchema = new Schema({
  player: String,
  picId: [Number],
  subImages: [Schema.Types.Mixed]
}, {collection: 'pics'});

var picSchema = new Schema({
  picId: Number,
  imageSegments: Number,
  players: [String],
  completedImage: String,
  subImages: [Schema.Types.Mixed]
}, {collection: 'pics'});

var PicModel = mongoose.model('pic', picSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pic/:id', function(req, res, next) {
  console.log('id: ' + req.params.id);
  res.json({"id":  req.params.id});
});

router.post('/pic/initialiseImage', function(req, res, next) {
  var userId = req.body.userId;
  var imageData = req.body.imageData;
  var nextImageData = req.body.nextImageData;
});

router.post('/pic/addSubImage', function(req, res, next) {
  var picId = req.body.picId;
  var userId = req.body.userId;
  var imageData = req.body.imageData;
  var nextImageData = req.body.nextImageData;
});



module.exports = router;

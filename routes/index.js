var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/sherk');

/*
  pic schema
  -----------
  var pic = {
    pidId: 123_1
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

var picSchema = new Schema({
  picId: Number,
  imageSegments: Number,
  players: [String],
  completedImage: String,
  subImages: [Schema.Types.Mixed]
}, {collection: 'pics'});

var playerSchema = new Schema({
  player: String,
  picIds: [String]
}, {collection: 'players'});

var PicModel = mongoose.model('pic', picSchema);
var PlayerModel = mongoose.model('player', playerSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pic/:id', function(req, res, next) {
  console.log('id: ' + req.params.id);
  res.json({"id":  req.params.id});
});

router.get('/getUsers', function(req, res, next) {
  PlayerModel.find({}, function(err, playerDocs) {
    console.log('players: ' + playerDocs.length);
    res.json(playerDocs);
  });
});

//router.post('/addPlayer', function(req, res, next) {
//  var player = req.body.userId;
router.get('/addPlayer/:userId', function(req, res, next) {
  var player = req.params.userId;
  PlayerModel.find({player: player}, function(err, players) {
    if (players.length === 0) {
      var newPlayer = new PlayerModel({player: player, picIds: []});
      newPlayer.save(function(err) {
        if (err) {
          return;
        }
        res.json({player: player});
      });
    }
  });
});

router.post('/initialiseImage', function(req, res, next) {
  var userId = req.body.userId;

  PlayerModel.findOne({player: userId}, function(err, player) {
    var newPicId = player.picIds.length + 1;
    //check if pic with id exists already, and create it if it doesn't
    PicModel.find({picId: newPicId}, function(err, pics) {
      if (pics.length === 0) {
        //create new pic
        var newPic = new PicModel({picId: newPicId});
        newPic.save(function(err) {
          if (err) {
            //error
            return;
          }
          //if the save was successful, we can add the pic id to the player
          player.picIds.push(newPicId);
          player.save(function(err) {
            if (err) {
              return;
            }
            res.json({initialised: true});
          });
        });
      }
    });
  });
});

router.post('/addSubImage', function(req, res, next) {
  var picId = req.body.picId;
  var userId = req.body.userId;
  var imageData = req.body.imageData;
  var nextImageData = req.body.nextImageData;
});



module.exports = router;

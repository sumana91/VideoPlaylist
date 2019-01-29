var express = require('express');
var router = express.Router();
var video = require('../db/models/video')

//Endpoint to insert a new video into the system.
router.post('/', function(req,res, next){
  video.forge({
    title : req.body.title,
    thumbnail : req.body.thumbnail,
    url : req.body.url,
    duration : req.body.duration
  })
  .save()
  .then(function (video) {
    res.status(200).json({error: false, data: video.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

//Endpoint that accepts the video ID as a parameter and returns data about that video
router.get('/:id', function(req,res){
  video.forge({id:req.params.id})
    .fetch({require: true})
    .then(function(result){
      res.status(200).json({error: false, data: video.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}})
    });
});


//Endpoint that accepts the video ID as a parameter and deletes the video
router.delete('/:id',function (req, res) {
  video.forge({id: req.params.id})
  .fetch({require: true})
  .then(function (video) {
    video.destroy()
    .then(function () {
      res.json({error: false, data: {message: 'video successfully deleted'}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
})


module.exports = router;

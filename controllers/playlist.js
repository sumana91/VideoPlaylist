var express = require('express');
var router = express.Router();
var playlist = require('../db/models/playlist')
var playlist_video = require('../db/models/playlist_video')
var video = require('../db/models/video')

//Endpoint to insert a new playlist, accepting list of parameters
router.post('/', function(req,res, next){
  var video_list = req.query.array;
  var final_title_list = [];
  video.fetchAll({columns: ['title']})
  .then(function(result) {
    var titlelist = [];
    List_title = result.toJSON();
    for(var i in List_title){
      title = List_title[i].title;
      titlelist.push(title);
    }
    final_title_list = video_list.filter(value => -1 !== titlelist.indexOf(value));
    return final_title_list;
  }).then(function(result) {
    if(result.length === 0) {
      res.status(500).json({error: true, data: {message:'no videos existing'}});
    }else {
      playlist.forge({
        name : req.body.name,
        website_url : req.body.website_url
      })
      .save()
      .then(function(playlistresult) {
        for(var i = 0; i < match.length; i++) {
          video.query({where: {title: match[i]}})
          .fetch({require: true})
          .then(function(video_result){
            playlist_video.forge({
              playlist_id : playlistresult.attributes.id,
              video_id : video_result.attributes.id
            })
            .save()
          })
        }
        res.status(200).json({error: false, data: {message:'successfully added playlist'}});
      })
    }
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message:err.message}});
  })
})


//endpoint that accepts the playlist ID as a parameter and returns the list of videos for that playlists
router.get('/:playlist_id', function (req, res) {
  playlist_video.where({'playlist_id': req.params.playlist_id})
  .fetchAll({columns:['video_id']})
  .then(function (collection) {
    var video_id_list = collection.toJSON()
    var videolist = [];
    for(var i = 0; i < video_id_list.length; i++) {
      video.forge({id:video_id_list[i].video_id})
      .fetch({columns:['title']})
      .then(function(result){
        videolist.push(result.attributes.title);
        if (videolist.length == video_id_list.length) {
          console.log("Returning", videolist)
          res.status(200).json({error: false, data:videolist})
        }
      })
    }
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}})
  })
})


//Endpoint that accepts the playlist ID as a parameter and delete the playlist
router.delete('/:id',function (req, res) {
  playlist.forge({id: req.params.id})
  .fetch({require: true})
  .then(function (result) {
    playlist_video.where({'playlist_id': result.attributes.id})
    .destroy({columns:['playlist_id']})
    result.destroy()
    res.json({error: false, data: {message: 'video successfully deleted'}});
  })
  .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
})

module.exports = router;

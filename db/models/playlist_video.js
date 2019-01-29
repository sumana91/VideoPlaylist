var bookshelf = require('../initialize')

var playlist_video = bookshelf.Model.extend({
  tableName: 'playlist_video',
  hasTimestamps : false
})

module.exports = bookshelf.model('playlist_video', playlist_video)

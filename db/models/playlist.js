var bookshelf = require('../initialize')

var playlist = bookshelf.Model.extend({
  tableName: 'playlist',
  video: function() {
    return this.hasMany('video')
  },
  hasTimestamps : false,
})

module.exports = bookshelf.model('playlist', playlist)

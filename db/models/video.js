var bookshelf = require('../initialize')

var video = bookshelf.Model.extend({
  tableName: 'video',
  playlist: function() {
    return this.hasMany('playlist')
  },
  hasTimestamps : false
})

module.exports = bookshelf.model('video', video)

//Database schema

exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('video', function (table) {
        table.increments('id').primary()
        table.string('title').unique()
        table.string('thumbnail')
        table.string('url')
        table.integer('duration')
      }),

      knex.schema.createTable('playlist', function (table) {
        table.increments('id').primary()
        table.string('name').unique()
        table.string('website_url')
    }),

     knex.schema.createTable('playlist_video', function (table) {
        table.increments('id').primary()
        table.integer('playlist_id')
        table.foreign('playlist_id').references('playlist.id')
        table.integer('video_id')
        table.foreign('video_id').references('video.id')
      })
    ])
  }

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('video'),
    knex.schema.dropTableIfExists('playlist'),
    knex.schema.dropTableIfExists('playlist_video')
  ])
}

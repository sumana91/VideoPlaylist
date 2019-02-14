# VideoPlaylist
Application to add set of videos and creating a playlist with those set of videos, in Nodejs and Postgresql.

## Requirements
- Nodejs
- Express js
- Postgresql
- Knex, Bookshelf
- Postman

### Install Dependencies
`npm install --save`

### Setup the database and run the migration script(knexfile.js)
`knex migrate:latest`

### Run it locally
- Clone this repository
- Setup the database by running the migration script
- Run the application by `node app.js`
- Port is 8009

### Set of APIs implemented
  1. Endpoint to insert a new video into the system.  
  POST request on `/api/video`. 
  2. Endpoint that accepts the video ID as a parameter and returns data about that video.  
  GET request on `/api/video/:id` 
  3. Endpoint that accepts the video ID as a parameter and deletes the video.  
  DELETE request on `/api/video/:id` 
  4. Endpoint to insert a new playlist. The endpoint accepts a list of videos as parameters.  
  POST request on `/api/playlist?video_list=` 
  5. Endpoint that accepts the playlist ID as a parameter and returns the list of videos for that playlist.  
  GET request on `/api/playlist/:playlist_id` 
  6. Endpoint that accepts the playlist ID as a parameter and delete the playlist.  
  DELETE request on `/api/playlist/:id` 

### Shuffling the playlist
Run the shuffle.js code to shuffle the playlist by `shuffle_videos(video_list)`










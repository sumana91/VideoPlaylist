//program to shuffle a list of videos

function shuffle_videos(video_list) {
    for (var i = video_list.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = video_list[i];
        video_list[i] = video_list[j];
        video_list[j] = temp;
    }
    return video_list;
}

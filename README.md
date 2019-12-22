# Playlist-generator
Installation

1.Download repository

2.Install requirements

3.Fill config.ini file with your API keys

Note: On the first run, open given url with a browser and complete authorization. Then paste redirected url to the console.

Usage Get Similar Tracks parameters:

artist (required): track (required): count (optional): default = 20 playlistName (optional): default = "Similar Tracks to {track}"

main.py getsimilar --artist="muse" --track="survival" --count=20 --playlistName="example playlist"

python main.py toptracksbycountry --country=turkey --count=10

run "python main.py" on command prompt to start Flask

firstly vim is open, exit vim then continue

localhost:5000/topTurkey : creates top 50 tracks of turkey with "top tukey" playlist name

localhost:5000/getSimilar/artist_track_count_name : creates similar songs 'track' by 'artist' with number of 'count' to the playlist name 'name'.

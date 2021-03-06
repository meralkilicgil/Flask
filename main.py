#!/usr/bin/python
# -*- coding: utf-8 -*-
import configparser
import sys
import json
from random import randint
from collections import OrderedDict
import lastFM
import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyClientCredentials
import fire
from importlib import reload
import os
from urllib.parse import urlsplit, urlunsplit
from random import randrange
import json

from flask import Flask, redirect, url_for, request, render_template
app = Flask(__name__)
global token2

@app.route('/')
def index():
    return render_template('static/src/App.js')


@app.route('/create', methods=['POST'])
def select():
    global token2
    if request.method == 'POST':
        artist = request.form['artist']
        track = request.form['track']
        count = request.form['count']
        name = request.form['plName']
        return getSimilar(artist, track, count, name)
    else:
       return redirect(url_for('/'))

@app.route('/data')
def data():
    global token2
    split_url = urlsplit(request.url)
    token2 = split_url.query
    return redirect('http://localhost:3000/similar')

@app.route('/success')
def goSuccess(playlistName):
    created= "Your playlist '" + playlistName +"' has been created successfully!"
    return render_template('static/info.html', result=created)

@app.route('/toptracks_country', methods=['POST', 'GET'])
def getTopTracksofCountry():
    global token2
    if request.method == 'POST':
        country = request.form['country']
        count = request.form['count']
        name = request.form['plName']
        return getTopTracksByCountry(country, count, name)
    else:
        return redirect(url_for('/'))

@app.route('/toptracks_artist', methods=['POST', 'GET'])
def getTopTracksOfArtist():
    global token2
    if request.method == 'POST':
        artist = request.form['artist']
        count = request.form['count']
        name = request.form['plName']
        return getTopTracksByArtist(artist, count, name)
    else:
        return redirect(url_for('/'))

@app.route('/toptracks_tag', methods=['POST', 'GET'])
def getTopTracksOfTag():
    global token2
    if request.method == 'POST':
        tag = request.form['tag']
        count = request.form['count']
        name = request.form['plName']
        return getTopTracksByTag(tag, count, name)
    else:
        return redirect(url_for('/'))

@app.route('/discoverAlbumByTag', methods=['POST', 'GET'])
def showTopAlbumsOfTag():
    global token2
    if request.method == 'POST':
        tag = request.form['tag']
        count = request.form['count']
        your_list= showTopAlbumsByTag(tag, count)
        result = "Discover: Top " + count + " albums of '" + tag + "' genre"
        return render_template('static/TracksAlbums.html', your_list=your_list, result= result, header1= "Artist", header2= "Album")
        #return redirect('http://localhost:3000/discovery', code=301)

@app.route('/discoverTrackByTag', methods=['POST', 'GET'])
def showTopTracksOfTag():
    global token2
    if request.method == 'POST':
        tag = request.form['tag']
        count = request.form['count']
        your_list= showTopTracksByTag(tag, count)
        result = "Discover: Top " + count + " tracks of '" + tag + "' genre"
        return render_template('static/TracksAlbums.html', your_list=your_list, result= result, header1= "Artist", header2= "Song")
        #return redirect('http://localhost:3000/discovery', code=301)

@app.route('/discoverArtistByTag', methods=['POST', 'GET'])
def showTopArtistsOfTag():
    global token2
    if request.method == 'POST':
        tag = request.form['tag']
        count = request.form['count']
        your_list= showTopArtistsByTag(tag, count)
        result = "Discover: Top " + count + " artists of tag '" + tag + "'"
        return render_template('static/Success.html', your_list=your_list, result= result)

@app.route('/discoverShowRandomTag', methods=['POST', 'GET'])
def showRandomTagType():
    global token2
    if request.method == 'POST':
        your_list= showRandomTag()
        result = "Random tag: "
        return render_template('static/Success.html', your_list=your_list, result= result)
        
@app.route('/discoverTagByArtist', methods=['POST', 'GET'])
def showTopTagsOfArtist():
    global token2
    if request.method == 'POST':
        artist = request.form['artist']
        your_list= showTopTagsForArtist(artist)
        result = "Discover: Top tags of artist '" + artist + "'"
        return render_template('static/Success.html', your_list=your_list, result= result)

@app.route('/discoverTrackByArtist', methods=['POST', 'GET'])
def showTopTracksOfArtist():
    global token2
    if request.method == 'POST':
        artist = request.form['artist']
        count = request.form['count']
        your_list= showTopTracksByArtist(artist, count)
        result = "Discover: Top " + count + " tracks of artist '" + artist +"'"
        return render_template('static/Success.html', your_list=your_list, result= result)

@app.route('/discoverTopArtists', methods=['POST', 'GET'])
def showTopArtistList():
    global token2
    if request.method == 'POST':
        your_list= showTopArtistsChart()
        result = "Discover: Top artists chart "
        return render_template('static/Success.html', your_list=your_list, result= result)

@app.route('/discoverTracksByCountry', methods=['POST', 'GET'])
def showTopTracksOfCountry():
    global token2
    if request.method == 'POST':
        country = request.form['country']
        your_list= showTopTracksByCountry(country)
        result = "Discover: Top tracks of country '" + country + "'"
        return render_template('static/TracksAlbums.html', your_list=your_list, result= result, header1= "Artist", header2= "Song")   

@app.route('/discoverArtistByCountry', methods=['POST', 'GET'])
def showTopArtistsOfCountry():
    global token2
    if request.method == 'POST':
        country = request.form['country']
        your_list= showTopArtistsByCountry(country)
        result = "Discover: Top artists of country '" + country + "'"
        return render_template('static/Success.html', your_list=your_list, result= result)   

@app.route('/discoverTagInfo', methods=['POST', 'GET'])
def printTagInfo():
    global token2
    if request.method == 'POST':
        tag = request.form['tag']
        info = showTagInfo(tag)
        x = info.find('<')
        if(x > 0):
            info = info[:x]
        result = "Discover: Information about '" + tag + "' music"
        return render_template('static/info.html', your_list=info, result= result)  

@app.route('/feellucky_tag', methods=['POST', 'GET'])
def feelLucky():
    global token2
    if request.method == 'POST':    
        f = open('genres.json','r')
        genres = json.load(f)
        f.close()   
        tag = genres[randrange(len(genres))]
        count = 20
        name = "Feel lucky: " + tag
        return getTopTracksByTag(tag, count, name) 
        
@app.route('/feellucky_artist', methods=['POST', 'GET'])
def feelLuckyArtist():
    global token2
    if request.method == 'POST':  
        j = open('artists.json','r')
        artists = json.load(j)
        j.close()      
        artist = artists[randrange(len(artists))]
        count = 20
        name = "Feel lucky: " + artist
        return getTopTracksByArtist(artist, count, name)

@app.route('/feellucky_country', methods=['POST', 'GET'])
def feelLuckyCountry():
    global token2
    if request.method == 'POST':       
        k = open('countries.json','r')
        countries = json.load(k)
        k.close()  
        country = countries[randrange(len(countries))]
        count = 20
        name = "Feel lucky: " + country
        return getTopTracksByCountry(country, count, name)

reload(sys)    # to re-enable sys.setdefaultencoding()
#sys.setdefaultencoding('utf-8')



config = configparser.RawConfigParser()
config.read('config.ini')
    
username = config.get('Spotify', 'UserName')
client_id = config.get('Spotify', 'client_id')
client_secret = config.get('Spotify', 'client_secret')
lastFMUserName = config.get('Last.FM', 'UserName')
redirect_uri = config.get('Spotify', 'redirect-uri')


def getSimilar(artist, track, count, playlistName):
    
    print ("%s similar tracks to %s" % (count, track))
    result = lastFM.getSimilar(artist = artist, track = track, limit = count)

    if result is not None:
        if playlistName is None:
            playlistName = "Similar Songs to %s" % track.capitalize()

        track_IDs = getTrackIDs(result)
        generatePlaylist(track_IDs, playlistName)
        return goSuccess(playlistName)


def getUserTopTracks(lastFMUserName = lastFMUserName, period = "1month", count = 20, playlistName = None):

    print ("%s\'s top %s tracks (%s)" % (lastFMUserName, count, period))
    result = lastFM.getTopTracks(lastFMUserName, period = period, limit = count) #period="overall"
    
    if result is not None:
        if playlistName is None:
            playlistName = "%s\'s Top Songs" % lastFMUserName

        track_IDs = getTrackIDs(result)
        generatePlaylist (track_IDs, playlistName)



def getUserLovedTracks(lastFMUserName = lastFMUserName, playlistName = None):
    
    print ("loved tracks by %s" % lastFMUserName)
    result = lastFM.getLovedTracks(lastFMUserName)

    if result is not None:
        if playlistName is None:
            playlistName = "Loved Songs by %s" % lastFMUserName

        track_IDs = getTrackIDs(result)
        generatePlaylist (track_IDs, playlistName)



def getTopTracksByCountry(country, count, playlistName):
   
    print ("%s Top %s" % (country, count))
    result = lastFM.getGeoTopTracks(country = country, limit = count)

    if result is not None:
        if playlistName is None:
            playlistName = "%s Top %s" % (country.capitalize(), count)
        
        track_IDs = getTrackIDs(result)
        generatePlaylist (track_IDs, playlistName)
        return goSuccess(playlistName)

def getTopTracksByArtist(artist, count, playlistName):
    
    print ("The best %s songs" % artist.capitalize())
    result = lastFM.getArtistTopTracks(artist = artist, limit = count)

    if result is not None:
        if playlistName is None:
            playlistName = "The best %s songs" % artist.capitalize()

        track_IDs = getTrackIDs(result)
        generatePlaylist (track_IDs, playlistName)
        return goSuccess(playlistName)


def getTopTracksByTag (tag, count, playlistName):

    print ("Top %s Songs" % (tag))
    result = lastFM.getTopTracksByTag(tag = tag, limit = count)

    if result is not None:
        if playlistName is None:
            playlistName = "Top %s Songs" % tag.capitalize()
        
        track_IDs = getTrackIDs(result)
        generatePlaylist (track_IDs, playlistName)
        return goSuccess(playlistName)


def getUserTopAlbums(lastFMUserName = lastFMUserName, count = 10, period = '3month', playlistName = None):
    
    print ("%s\'s top %s albums (%s)" % (lastFMUserName, count, period))
    result = lastFM.getTopAlbums(username = lastFMUserName, limit = count, period = period)

    if result is not None:
        if playlistName is None:
            playlistName = "%s\'s top albums" % lastFMUserName

        track_IDs = getTrackIDsFromAlbum(getAlbumIDs(result))
        generatePlaylist(track_IDs, playlistName)


def getTopTracksChart (count, playlistName):
    
    print ("Top Songs by Last.FM")
    result = lastFM.getChartTopTracks(limit = count)

    if result is not None:
        if playlistName is None:
            playlistName = "Top Songs by Last.FM"
        
        track_IDs = getTrackIDs(result)
        generatePlaylist (track_IDs, playlistName)
        return goSuccess(playlistName)


def getTopAlbumsByTag (tag, count, playlistName):
    print ("Top {0} albums".format(tag))
    result = lastFM.getTopAlbumsByTag(tag = tag, limit = count)

    if result is not None:
        if playlistName is None:
            playlistName = "Top {0} albums".format(tag)

        track_IDs = getTrackIDsFromAlbum(getAlbumIDs(result))
        generatePlaylist(track_IDs, playlistName)
        return goSuccess(playlistName)


def showTopTagsForArtist (artist):
    """top tags for an artist"""
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top tags for {0}".format(artist))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getTopTagsForArtist(artist = artist)

    if result is not None:
        index = 0
        for i in range(len(result)//4):
            print ("%-20s --> [%s]\t %-20s --> [%s]\t %-20s --> [%s]\t %-20s --> [%s]")
            print((result[index][0], result[index][1], result[index+1][0], result[index+1][1], result[index+2][0], result[index+2][1], result[index+3][0], result[index+3][1]))
            index = index + 4    
        print ("{0:20s}".format("-------------------------------------------------------------"))
    return result


def showTopTags ():
    """top tags from last.fm"""
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("Top Tags")
    print ("{0:20s}".format("-------------------------------------------------------------"))
    
    result = lastFM.getTopTags()
    
    if result is not None:
        index = 0
        for i in range(len(result)/5):
            print ("%-20s\t %-20s\t %-20s\t %-20s\t %-20s")
            print((result[index], result[index+1], result[index+2], result[index+3], result[index+4]))
            index = index + 5
        print ("{0:20s}".format("-------------------------------------------------------------"))



def showSimilarTags (tag):
    """similar tags to given tag"""
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("similar tags to {0}".format(tag))
    print ("{0:20s}".format("-------------------------------------------------------------"))
    
    f = open('genres.json','r')
    genres = json.load(f)
    f.close()
    
    for genre in genres:
        if genre['name'] == tag:
            for similar in genre['sims']:
                print ("{0:<25s} :  [{1}]".format(similar['name'], similar['similarity']))
            print ("{0:20s}".format("-------------------------------------------------------------"))
            return
    print ("similar tags not found...")

def getFamilyTags (tag):
    
    f = open('genres.json','r')
    genres = json.load(f)
    f.close()
    family = []
    for genre in genres:
        if genre['name'] == tag:
            for f in genre['family']:
                family.append(f)
            return family
    return None



def showTopTagsChart ():
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("Top Tags Chart")
    print ("{0:20s}".format("-------------------------------------------------------------"))
    
    result = lastFM.getTopTagsChart()
    
    if result is not None:
        index = 0
        for i in range(len(result)//5):
            print ("%-20s\t %-20s\t %-20s\t %-20s\t %-20s" )
            print( (result[index], result[index+1], result[index+2], result[index+3], result[index+4]))
            index = index + 5   
        print ("{0:20s}".format("-------------------------------------------------------------"))



def showTopArtistsByTag (tag, count = 25):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("Top {0} artists".format(tag))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getTagTopArtists(tag = tag, limit = count)

    if result is not None:
        index = 0
        for i in range(len(result)//5):
            print ("%-20s\t %-20s\t %-20s\t %-20s\t %-20s" )
            print( (result[index], result[index+1], result[index+2], result[index+3], result[index+4]))
            index = index + 5 
        print ("{0:20s}".format("-------------------------------------------------------------"))
    return result


def showSimilarArtists (artist, count = 15):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("Similar artists to {0}".format(artist))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getSimilarArtists(artist = artist, limit = count)

    if result is not None:
        for r in result:
            print ("%-25s  [ %s ]" % (r[0], r[1]))
            print ("{0:20s}".format("-------------------------------------------------------------"))



def showTopTagsForTrack (artist, track):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top tags for {0} [ {1} ]".format(track, artist))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getTopTagsForTrack(artist = artist, track = track)

    if result is not None:
        index = 0
        for i in range(len(result)//4):
            print ("%-20s --> [%s]\t %-20s --> [%s]\t %-20s --> [%s]\t %-20s --> [%s]")
            print( (result[index][0], result[index][1], result[index+1][0], result[index+1][1], result[index+2][0], result[index+2][1], result[index+3][0], result[index+3][1]))
            index = index + 4
        print ("{0:20s}".format("-------------------------------------------------------------"))



def showTopTagsForAlbum (artist, album):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top tags for {0} [ {1} ]".format(album, artist))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getTopTagsForAlbum(artist = artist, album = album)

    if result is not None:
        index = 0
        for i in range(len(result)//4):
            print ("%-20s --> [%s]\t %-20s --> [%s]\t %-20s --> [%s]\t %-20s --> [%s]" )
            print ((result[index][0], result[index][1], result[index+1][0], result[index+1][1], result[index+2][0], result[index+2][1], result[index+3][0], result[index+3][1]))
            index = index + 4
        print ("{0:20s}".format("-------------------------------------------------------------"))



def showTopAlbumsByTag (tag, count = 20):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top {0} albums".format(tag))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getTopAlbumsByTag(tag = tag, limit = count)

    if result is not None:
        for r in result:
            print("{0} - {1}".format(r[0], r[1]))
            print ("{0:20s}".format("-------------------------------------------------------------"))
     
    return result

def showTopTracksByTag (tag, count = 20):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top {0} songs".format(tag))
    print ("{0:20s}".format("-------------------------------------------------------------"))
    
    result = lastFM.getTopTracksByTag(tag = tag, limit = count)

    if result is not None:
        for r in result:
            print("{0} - {1}".format(r[0], r[1]))
            print ("{0:20s}".format("-------------------------------------------------------------"))

    return result

def showTopTracksByArtist (artist, count = 20):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top {0} songs".format(artist))
    print ("{0:20s}".format("-------------------------------------------------------------"))    

    result = lastFM.getArtistTopTracks(artist = artist, limit = count)

    if result is not None:
        for r in result:
            print("{0} - {1}".format(r[0].capitalize(), r[1]))
            print ("{0:20s}".format("-------------------------------------------------------------"))

    return result

def showTopTracksByCountry (country):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top songs in {0}".format(country.capitalize()))
    print ("{0:20s}".format("-------------------------------------------------------------")) 
    
    result = lastFM.getGeoTopTracks(country = country, limit = 50)

    if result is not None:
        for index,r in enumerate(result):
            print ("{0}. {1} - {2}".format(index+1, r[0], r[1]))
            print ("{0:20s}".format("-------------------------------------------------------------")) 

    return result

def showTopArtistsChart ():
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top artists chart")
    print ("{0:20s}".format("-------------------------------------------------------------"))    

    result = lastFM.getTopArtistsChart()

    if result is not None:
        for index,r in enumerate(result):
            print ("{0} - {1}".format(index+1, r))
            print ("{0:20s}".format("-------------------------------------------------------------"))  
    return result

def showTopArtistsByCountry (country):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top artists in {0}".format(country))
    print ("{0:20s}".format("-------------------------------------------------------------"))    

    result = lastFM.getGeoTopArtists(country = country, limit = 50)

    if result is not None:
        for index,r in enumerate(result):
            print ("{0} - {1}".format(index+1, r))
            print ("{0:20s}".format("-------------------------------------------------------------"))  

    return result

def showTopTracksChart ():
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("top tracks chart")
    print ("{0:20s}".format("-------------------------------------------------------------"))   

    result = lastFM.getChartTopTracks (limit = 50)

    if result is not None:
        for index,r in enumerate(result):
            print ("{0}. {1} - {2}".format(index+1, r[0], r[1]))
            print ("{0:20s}".format("-------------------------------------------------------------"))  



def showUserTopTracks (user = lastFMUserName, count = 50, period = 'overall'):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("{0}'s top tracks [ {1} ]".format(user, period))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getTopTracks(username = user, limit = count, period = period, includePC = True)

    if result is not None:
        for index, r in enumerate(result):
            print ("{0}. {1} - {2}  [ {3} ]".format(index+1, r[0], r[1], r[2]))    
            print ("{0:20s}".format("-------------------------------------------------------------"))



def showUserTopArtists (user = lastFMUserName, count = 50, period = 'overall'):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("{0}'s top artists [ {1} ]".format(user, period))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getTopArtists(username = user, limit = count, period = period, includePC = True)

    if result is not None:
        for index, r in enumerate(result):
            print ("{0}. {1} [ {2} ]".format(index+1, r[0], r[1]))    
            print ("{0:20s}".format("-------------------------------------------------------------"))



def showUserTopAlbums (user = lastFMUserName, count = 50, period = 'overall'):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("{0}'s top albums [ {1} ]".format(user, period))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getTopAlbums(username = user, limit = count, period = period, includePC = True)

    if result is not None:
        for index, r in enumerate(result):
            print ("{0}. {1} - {2}  [{3}]".format(index+1, r[0], r[1], r[2]))   
            print ("{0:20s}".format("-------------------------------------------------------------"))   



def showUserLovedTracks (user = lastFMUserName):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("{0}'s loved tracks".format(user))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result = lastFM.getLovedTracks(username = user)

    if result is not None:
        for index, r in enumerate(result):
            print ("{0}. {1} - {2}".format(index+1, r[0], r[1]))    
            print ("{0:20s}".format("-------------------------------------------------------------"))



def showTagInfo (tag):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("{0}".format(tag))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result  = lastFM.getTagInfo(tag)
    
    if result is not None:
        print ("{0}".format(result))
    else: 
        print ("no info....")
    
    print ("{0:20s}".format("-------------------------------------------------------------"))
    return result

def showAlbumInfo (album):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("{0}".format(album))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result  = lastFM.getAlbumInfo(album)
    
    if result is not None:
        print ("{0}".format(result))
    else: 
        print ("no info....")
    
    print ("{0:20s}".format("-------------------------------------------------------------"))
    return result

def showTrackInfo (track):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("{0}".format(track))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result  = lastFM.getTrackInfo(track)
    
    if result is not None:
        print ("{0}".format(result))
    else: 
        print ("no info....")
    
    print ("{0:20s}".format("-------------------------------------------------------------"))
    return result

def showArtistInfo (artist):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("{0}".format(artist))
    print ("{0:20s}".format("-------------------------------------------------------------"))

    result  = lastFM.getArtistInfo(artist)
    
    if result is not None:
        print ("{0}".format(result))
    else: 
        print ("no info....")
    
    print ("{0:20s}".format("-------------------------------------------------------------"))
    return result

def generatePlaylist(track_IDs, playlistName):
    """."""
    global token2
    if len(track_IDs) != 0:
        scope = "playlist-modify-public"
        token = token2
        
        if token:
            hasharr = token.split("%3F")
            username = hasharr[0]
            token = hasharr[1]
            sp = spotipy.Spotify(auth=token)
            sp.trace = False
            playlist = sp.user_playlist_create(username, playlistName)
            if playlist and playlist.get('id'):
                i = 0
                while (len(track_IDs) / 100) >= i:
                    if len(track_IDs) == i:
                        sp.user_playlist_add_tracks(username, playlist.get('id'), track_IDs[i * 100:])
                    else:
                        sp.user_playlist_add_tracks(username, playlist.get('id'), track_IDs[i*100:(i+1)*100])
                        i += 1
                print (playlistName + " has been created successfully...")
                return goSuccess(playlistName)

        else:
            print("Can't get token for ", username)



def getTrackIDs(result):
    track_IDs = []
    filters=['/', '.', 'ft', 'feat', '-', '[', '(', '~']
    count = len(result)
    found = 0
    
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    sp.trace = False
    

    for r in result:

        search_res = sp.search(q='artist:{0} track:{1}'.format(r[0], r[1]), type='track', limit=1, market='TR')

        if len(search_res['tracks']['items']) == 0:
            for letter in r[1]:
                if letter in filters:
                    search_res = sp.search(q='artist:{0} track:{1}'.format(r[0], r[1]), type='track', limit=1, market='TR')
                    break
            if len(search_res['tracks']['items']) > 0:
                if search_res['tracks']['items'][0]['id'] not in track_IDs:
                    track_IDs.append(search_res['tracks']['items'][0]['id'])
                    found = found + 1
                    print ('\r{0} - {1} [{2} of {3}]{4}\r'.format(r[0], r[1], found, count, ' '*50)),
             

            else:
                found = found + 1
                print ('\r{0} - {1} NOT FOUND [{2} of {3}]{4}\r'.format(r[0], r[1], found, count, ' '*50)),

            continue
        if search_res['tracks']['items'][0]['id'] not in track_IDs:
            track_IDs.append(search_res['tracks']['items'][0]['id'])
            found = found + 1
            #sys.stdout.write('\r%s - %s\t[%d of %d]\033[K\n' % (r[0], r[1], found, count))
            print ("{0} - {1} [{2} of {3}]{4}\r".format(r[0], r[1], found, count, ' '*50)),

    
    print ("\n")
    return track_IDs



def getArtistIDs (artists):
    artist_IDs = []  
    sp = spotipy.Spotify()

    for artist in artists:
        try:
            search_res = sp.search(q=artist, type='artist', limit=1, market='TR')
        except:
            "err"

        if search_res['artists']['total'] != 0:
            artist_IDs.append(search_res['artists']['items'][0]['id'])

    return artist_IDs 



def getAlbumIDs (result):
    album_IDs = []
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    sp.trace = False

    for r in result:
        search_res = sp.search(q='artist:{0} album:{1}'.format(r[0], r[1]), type='album', limit=1, market='TR')

        if search_res['albums']['total'] != 0:
            album_IDs.append(search_res['albums']['items'][0]['id'])
            print ("{0} - {1}".format(r[0], r[1]))
        else:
            print ("{0} - {1} ******* not found....".format(r[0], r[1]))

    return album_IDs 



def getTrackIDsFromAlbum (album_IDs):
    track_IDs = [] 
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    sp.trace = False

    for album_ID in album_IDs:
        i = 0
        next_ = ""
        while next_ is not None:
            search_res = sp.album_tracks(album_id = album_ID, limit = 50, offset = 50*i)
            for r in search_res['items']:
                track_IDs.append(r['id'])
            next_ = search_res['next']
            i = i + 1
    return track_IDs



def showRandomTag (count = 20):
    print ("{0:20s}".format("-------------------------------------------------------------"))
    print ("| random tags |")
    print ("{0:20s}".format("-------------------------------------------------------------"))
    
    f = open('genres.json','r')
    json_file = json.load(f)
    f.close()
    genres = []
    
    for i in range(count):
        l = len(json_file)
        t = []
        x = 0
        while True:
            x = randint(0, l)
            if x not in t:
                t.append(x)
                break
        #print x
        genres.append(json_file[x])  
    
    for genre in genres:
        print ("{0}".format(genre))
        print ("{0:20s}".format("-------------------------------------------------------------"))
    return genres


def AnalyzeTrack (artist, track, show_attribute = None):
    l = [artist, track]
    l2 = []
    l2.append(l)
    trackID = getTrackIDs(l2)
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    sp.trace = False
    features = sp.audio_features(trackID)
    
    if show_attribute is not None:
        print ("{0} : {1}".format(show_attribute, features[0].get(return_attribute)))
    
    else:
        k = features[0].keys()
        v = features[0].values()
        for i in range(len(k)):
            print ("{0}: {1}".format(k[i], v[i]))



def AudioFeatures (data, attributes=[]):
    track_IDs = getTrackIDs(data)

    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    sp.trace = False
    
    features = sp.audio_features(track_IDs)

    d = {}

    for attribute in attributes:
        d[attribute] = 0.0

    for feature in features:
        for f in feature:
            if d.has_key(f):
                d[f] = d[f] + feature[f]
    
    keys = d.keys()

    for key in keys:
        d[key] = d[key] / len(features)

    return d



def main():
    fire.Fire()



if __name__ == '__main__':

    fire.Fire({
      'getsimilar': getSimilar,
      
      'usertoptracks': getUserTopTracks,
      'userlovedtracks' : getUserLovedTracks,
      'usertopalbums' : getUserTopAlbums,
      
      'toptracksbycountry' : getTopTracksByCountry,
      'toptracksbyartist' : getTopTracksByArtist,
      'toptracksbytag' : getTopTracksByTag,
      'toptrackschart' : getTopTracksChart,
      'topalbumsbytag' : getTopAlbumsByTag,
      
      'showusertoptracks' : showUserTopTracks,
      'showusertopartists' : showUserTopArtists,
      'showusertopalbums' : showUserTopAlbums,
      'showuserlovedtracks' : showUserLovedTracks,

      'showtoptags' : showTopTags,
      'showrandomtag' : showRandomTag,
      'showsimilartags' : showSimilarTags,
      'showtaginfo' : showTagInfo,
      'showtrackinfo' : showTrackInfo,
      'showalbuminfo' : showAlbumInfo,
      'showartistinfo' : showArtistInfo,
      'showtoptagschart' : showTopTagsChart,     
      'showtoptagsforartist' : showTopTagsForArtist,
      'showtoptagsfortrack': showTopTagsForTrack,
      'showtoptagsforalbum': showTopTagsForAlbum,
      
      'showtoptracksbytag' : showTopTracksByTag,
      'showtoptracksbyartist' : showTopTracksByArtist,
      'showtoptrackschart' : showTopTracksChart,
      'showtoptracksbycountry' : showTopTracksByCountry,
      
      'showtopartistsbytag' : showTopArtistsByTag,
      'showtopartistsbycountry' : showTopArtistsByCountry,
      'showtopartistschart' : showTopArtistsChart,
      'showsimilarartists' : showSimilarArtists,
      
      'showtopalbumsbytag' : showTopAlbumsByTag,
          
      'analyzetrack' : AnalyzeTrack
  })

if __name__ == '__main__':
    app.config['SITE'] = "http://0.0.0.0:5000/"
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug = True)

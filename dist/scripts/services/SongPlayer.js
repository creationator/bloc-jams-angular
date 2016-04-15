(function() {
     function SongPlayer($rootScope, Fixtures) {

         /**
          * @desc Song player empty object
          * @type {Object}
          */
          var SongPlayer = {};



          /**
           * @desc Stores album data information
           * @type {Object}
           */
          var currentAlbum = Fixtures.getAlbum();



          /**
           * @desc Buzz object audio file
           * @type {Object}
           */
          var currentBuzzObject = null;


          /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */

           var setSong = function(song) {
               if (currentBuzzObject) {
                   currentBuzzObject.stop();
                   SongPlayer.currentSong.playing = null;
               }

               currentBuzzObject = new buzz.sound(song.audioUrl, {
                   formats: ['mp3'],
                   preload: true
               });

               currentBuzzObject.bind('timeupdate', function() {
                   $rootScope.$apply(function() {
                       SongPlayer.currentTime = currentBuzzObject.getTime();
                   });
               });

               currentBuzzObject.bind('volumeupdate', function() {
                   $rootScope.$apply(function() {
                       SongPlayer.volume = currentBuzzObject.getVolume();
                   });
               });

               SongPlayer.currentSong = song;
           };

          /**
           * @function playSong
           * @desc Plays new song
           * @param {Object} song
           */

          var playSong = function(song) {
            if (currentBuzzObject) {
              currentBuzzObject.play();
              song.playing = true;
            }
          };


          /**
           * @function getSongIndex
           * @desc Grabs the index of a song
           * @param {Object} song
           */
          var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };

          /**
           * @function stopSong
           * @desc stops current playing song
           * @param {Object}
           */
          var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
          };


          /**
            * @desc Active song object from list of songs
            * @type {Object}
            */

          SongPlayer.currentSong = null;

          /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          SongPlayer.currentTime = null;

          /**
          * @desc Current song volume
          * @type {Number}
          */
          SongPlayer.volume = null;



          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song);
                  }
             }
          };

          SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              stopSong(song);
          };


          /**
           * @function SongPlayer.previous
           * @desc Grabs the index of a song and decreses it by 1
           * @param {Object}
           */

          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;


            if (currentSongIndex < 0) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;

            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);

            }

          };


          /**
           * @function SongPlayer.previous
           * @desc Grabs the index of a song and increases it by 1
           * @param {Object}
           */


          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;


            if (currentSongIndex < 0) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;

            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);

            }

          };

          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */

          SongPlayer.setCurrentTime = function(time) {
              if (currentBuzzObject) {
                  currentBuzzObject.setTime(time);
              }
          };

          /**
          * @function setVolume
          * @desc Set volume of playing song
          * @param {Number} time
          */

          SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();

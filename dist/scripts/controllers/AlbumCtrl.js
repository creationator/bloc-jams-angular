(function() {
    function AlbumCtrl() {
        this.albumData = [];
        for (var i=0; i < 5; i++) {
          this.albumData.push(angular.copy(albumPicasso));
          // this.albumData = angular.copy(albumPicasso);
        }
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();


// Create a controller for the Album view.
// Link to the AlbumCtrl.js script source in index.html.
// Add an albumData property that holds a copy of albumPicasso.
// Use ngRepeat on the album-view-song-item table row to add a song row for each song on the album.

// Replace the static song information with the song data using the corresponding scope properties and markup:
// number (Refer to the table of "exposed properties" in the ngRepeat documentation)
// name
// length (You'll filter the time code in a later checkpoint)
// In the Album template, replace the static album information with the album data using markup:
// album art
// name
// artist
// year and record label

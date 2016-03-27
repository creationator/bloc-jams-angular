(function() {
    function AlbumCtrl() {
        this.albumData = [];//delete
        for (var i=0; i < 5; i++) {
          // this.albumData.push(angular.copy(albumPicasso)); delete
          this.albumData = angular.copy(albumPicasso);
          console.log(this.albumData);
        }
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();

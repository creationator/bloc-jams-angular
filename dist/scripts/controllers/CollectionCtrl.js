(function() {
    function CollectionCtrl(Fixtures, SongPlayer) {
      this.albums = Fixtures.getCollection(12);
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', 'SongPlayer', CollectionCtrl]);
})();


var eventHandler = {
    app: '',

    onload: function(app) {
        this.app = app;
        this.initListeners();
    },

    initListeners: function() {
        var self = this;

        this.app.socket.on('addPlayer', function (data) {
            self.app.player = data;
        });

        this.app.socket.on('userList', function (data) {
            self.app.displayPlayers(data);
        });

        this.app.socket.on('updatePlayer', function (data) {
            self.app.updatePlayer(data);
        });


        // catch up down left right events
        $(document).keydown(function(e) {
            // left
            if (e.keyCode == 37) { 
                if (self.app.player.y -1 >= 0) {
                  self.app.socket.emit('left', { player: self.app.player });
                }
               return false;
            }
            // up
            if (e.keyCode == 38) {
               if (self.app.player.x -1 >= 0) {
                  self.app.socket.emit('up', { player: self.app.player });
               }
               return false;
            }
            // right
            if (e.keyCode == 39) {
                if (self.app.player.y +1 <= self.app.worldWidth) {
                  self.app.socket.emit('right', { player: self.app.player });                  
                }
               return false;
            }
            // down
            if (e.keyCode == 40) { 
               if (self.app.player.x +1 <= self.app.worldHeight) {
                  self.app.socket.emit('down', { player: self.app.player });
               }
               return false;
            }
        });
    },
};
/**
* Main entry point
*/
var appJs = {
    socket: '',
    player: '',
    worldWidth: 10,
    worldHeight: 10,

    onload: function() {
        this.socket = connexion.onload();
        eventHandler.onload(this);
        this.initWorld();
    },

    initWorld: function() {
        var world = $('.world');
        // generate world
        for (var i = 0; i < 10; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < 10; j++) {
                var cell = document.createElement('td');
                cell.id = "x"+i+"y"+j;
                row.appendChild(cell);
            }
            world.append(row);
        }
    },

    // display all players on the world
    displayPlayers: function(data) {        
        for (var i = 0; i < data.length; i++) {
            var homeCell = $("#x" + data[i].x + 'y' + data[i].y);
            homeCell.css("background-color", data[i].color);
        }
    },

    updatePlayer: function(data) {
        this.player = data;
    },
}

// initialise appJs.onload at startup
window.onload = function () {
    appJs.onload();
};
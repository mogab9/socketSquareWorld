var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var userList    = [];
var worldWidth  = 10;
var worldHeight = 10;

io.sockets.on('connection', function (socket) {
  addPlayer(socket);
  movementHandler(socket);
  io.sockets.emit('userList', userList);
});

function movementHandler(socket) {

  // if left arrow key is sent by client
  socket.on('left', function (data) {

    var player = data.player;

    if (player.y -1 >= 0) {
      player.y       -= 1;
      var index       = findPlayerIndexById(data.player.id); // find player index in userList array
      userList[index] = player;
      socket.emit('updatePlayer', player); // emit player to update client player object
      io.sockets.emit('userList', userList);   // emit userlist to refresh the client view
    }
  });

  // if right arrow key is sent by client
  socket.on('right', function (data) {

    var player = data.player;

    if (player.y +1 < worldWidth) {
      player.y       += 1;
      var index       = findPlayerIndexById(data.player.id); // find player index in userList array
      userList[index] = player;
      socket.emit('updatePlayer', player);
      io.sockets.emit('userList', userList);
    }
    
  });

  // if down arrow key is sent by client
  socket.on('down', function (data) {

    var player = data.player;

    if (player.x +1 < worldHeight) {
      player.x       += 1;
      var index       = findPlayerIndexById(data.player.id); // find player index in userList array
      userList[index] = player;
      socket.emit('updatePlayer', player);
      io.sockets.emit('userList', userList);
    }
    
  });

  // if up arrow key is sent by client
  socket.on('up', function (data) {

    var player = data.player;

    if (player.x -1 >= 0) {
      player.x       -= 1;
      var index       = findPlayerIndexById(data.player.id); // find player index in userList array
      userList[index] = player;
      socket.emit('updatePlayer', player);
      io.sockets.emit('userList', userList);
    }
    
  });
}

// Create a new player at a random pos with a random color
function addPlayer(socket) {
  var player = { 
    x:     Math.floor(Math.random() * worldWidth), 
    y:     Math.floor(Math.random() * worldHeight),
    id:    Math.random(),
    color: randomColor(),
  };

  userList.push(player);

  socket.emit('addPlayer', player);
  socket.emit('userList', userList);
}

// Find player index in userList array
function findPlayerIndexById(id) {
  index = null;

  for (var i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
}

// Find a random color =D
function randomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}
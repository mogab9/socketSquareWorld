
var connexion = {
    onload: function() {
        var socket = io.connect('http://192.168.0.3:8080');
    
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });

        return socket;
    },
}
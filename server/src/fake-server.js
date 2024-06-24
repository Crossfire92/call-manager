var net = require('net');

var server = net.createServer(function(socket) {
  console.log(socket);
  socket.on('data', (data) => console.log(data.toString()));
});


server.listen(5050, '127.0.0.1');
console.log("Server running!");
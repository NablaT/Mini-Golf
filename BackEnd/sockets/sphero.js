var io = require("../core/core.js").getIO();

var sphero = io.of('/sphero');

sphero.on('connection', function (socket) {
    console.log('yo someone');
    var pouet = function (params) {
        console.log(params);
        socket.emit('world');
    };
    socket.on('hello', pouet);
});


module.exports = sphero;
var io = require("../core/core.js").getIO();

var sphero = io.of('/sphero');

sphero.on('connection', function (socket) {
    sphero.emit('Connexion', {});
    console.log('yo someone');
});


module.exports = sphero;
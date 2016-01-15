var io = require("../core/core.js").getIO();

var sphero = io.of('/sphero');

sphero.on('connection', function (socket) {
    sphero.emit('Connexion', {});
    console.log('yo someone');
});

var testSphero = function(distance, angle){
    sphero.emit('test', {"dist":distance, "angle":angle});
};

module.exports = {
    sphero:sphero, testSphero:testSphero
};
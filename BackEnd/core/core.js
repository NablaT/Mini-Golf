/*
 * Code module.
 */

var io      = null,
    http    = null,
    express = require('express'),
    app     = express();

/**
 * Get the io socket variable.
 * If null we define it, else we return the one created.
 * @returns {*} The singleton io variable.
 */
var getIO = function () {
    if (io == null) {
        io = require('socket.io')(getHttp());
    }

    return io;
};

/**
 * Get the http server variable.
 * If null we define it, else we return the one created.
 * @returns {*} The singleton http variable.
 */
var getHttp = function () {
    if (http == null) {
        http = require('http').Server(app);
    }
    return http;
};

module.exports = {getIO: getIO, getHttp: getHttp, app: app, express: express};
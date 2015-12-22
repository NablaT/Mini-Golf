/**
 * Created by guillaume on 18/12/2015.
 */

/*
 * Notre core module
 */

var io = null;
var http = null;
var express = require('express');
var app = express();

/**
 * Récupère la variable io pour socket.io
 * Si c null on la définit, sinon on la créée.
 * De cette manière on a un singleton.
 * @returns {*} Le singleton définissant io.
 */
var getIO = function() {
    if(io == null) {
        io = require('socket.io-client');
    }

    return io;
};

/**
 * Récupère la variable http pour le serveur.
 * Si c null on la définit, sinon on la créée.
 * De cette manière on a un singleton.
 * @returns {*} Le singleton définissant http.
 */
var getHttp = function() {
    if(http == null) {
        http = require('http').Server(app);
    }
    return http;
};

module.exports = {getIO : getIO, getHttp : getHttp, app: app, express : express};
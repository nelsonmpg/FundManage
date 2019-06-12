'use strict'
let sckOn = null,
    sckOnAll = null,
    clients = {},
    ServerSktIo = function (options) {
        this.server = options.server;
    };

ServerSktIo.prototype.init = function () {
    let self = this;
    this.io = this.server.io;
    sckOnAll = this.io;

    this.io.on("connection", function (socket) {
        sckOn = socket;
        clients[socket.id] = socket.id;
        socket.emit("socketId", socket.id);
        let c = socket.request.connection._peername;
        console.log(`+++++++++++++++++++++ ADD ++++++++++++++++++++++++++`);
        console.log(`Connected: ${c.address}: ${c.port}`);
        console.log(`User - ${socket.id}`);
        console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++`);

        // deteta quando o cliente se desconecta do servidor
        socket.on('disconnect', function () {
            console.log(`Client Disconnect...`);
            delete clients[socket.id];
        });

    });
}

ServerSktIo.prototype.sendMsgToPage = function (tag, msg) {
    // console.log("Send", tag, msg);
    sendOutPutMsg(tag, msg);
};

function sendOutPutMsg(tag, msg) {
    if (sckOn || sckOnAll) {
        // console.log("Socket.", tag, msg, sckOn.id);
        sckOnAll.sockets.emit(tag, msg);
    } else {
        console.log("Else");
    }
}

module.exports = ServerSktIo;
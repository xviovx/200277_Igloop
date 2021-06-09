var http = require("http");

var fs = require("fs");

var server = http.createServer();

var users = [];
 
var history = null;

var io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("A client connected: " + socket.id);

    socket.on("login:data", (loginData) => {
        users.push(loginData.username);
        console.log(loginData.username + " is requesting login permission");
    });

    socket.on("userlist:request", (message) => {
        io.emit("user:list", users);
    });

    socket.on("history:request", (message) => {

        getHistory();

        socket.emit("history:response", history);
    });

    socket.on("message:send", (messageReceived) => {
        history.push(messageReceived);

        addToHistory();

        io.emit("new:message", messageReceived);
    });

});

function getHistory() {
    if(history == null) {
        history = JSON.parse(fs.readFileSync("history.txt", "utf-8"));
    };
};

function addToHistory() {
    fs.writeFileSync("history.txt", JSON.stringify(history), function(err) {
        if(err) throw err;
    });
};

server.listen(8888, function(){
    console.log("listening on port 8888.....");
});
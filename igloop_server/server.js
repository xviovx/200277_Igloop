var http = require("http");

var fs = require("fs");

//create server
var server = http.createServer();

//user list
var users = [];

//chat history 
var history = null;

//socket initialisation 
var io = require("socket.io")(server);

//listen for connection from client side
io.on("connection", (socket) => {
    console.log("A client connected: " + socket.id);

    //listen for client login request
    socket.on("login:data", (loginData) => {
        users.push(loginData.username);
        console.log(loginData.username + " is requesting login permission");
    });

    //listen for user list request
    socket.on("userlist:request", (message) => {
        //respond with the user list to all clients 
        io.emit("user:list", users);
    });

    //listen for history
    socket.on("history:request", (message) => {
        //to do: validation

        getHistory();

        socket.emit("history:response", history);
    });

    //listen for message
    socket.on("message:send", (messageReceived) => {
        history.push(messageReceived);

        addToHistory();

        io.emit("new:message", messageReceived);
    });

});

//function to get message history
function getHistory() {
    if(history == null) {
        history = JSON.parse(fs.readFileSync("history.txt", "utf-8"));
    };
};

//function to update message history in history.txt
function addToHistory() {
    fs.writeFileSync("history.txt", JSON.stringify(history), function(err) {
        if(err) throw err;
    });
};

//host server side on port 8888
server.listen(8888, function(){
    console.log("listening on port 8888.....");
});
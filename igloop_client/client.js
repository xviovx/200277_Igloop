var http = require("http");
var querystring = require("querystring");
var fs = require("fs");
var templates = require("es6-template-strings");

//setup client socket
var io = require("socket.io-client");

//connect the socket to the server
var socket = io("http://localhost:8888", {transports: ["websocket"]});

//GET request response
var handleFormGet = function(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});

    //get template page
    fs.readFile("templates/signIn.html", "utf-8", function(err, data) {
        if(err) {throw err;};

        response.write(data);
        response.end();
    });
};

//POST request response
var handleFormPost = function(request, response){
    response.writeHead(200, {"Content-Type" : "text/html"});


    var payload = "";

    //event on data received
    request.on("data", function(data) {
        payload += data;
    });

    //event on the end of request
    request.on("end", function(){
        response.writeHead(200, {"Content-Type" : "text/html"});

        var post = querystring.parse(payload);

        //request login on the server
        socket.emit("login:data", post);

        fs.readFile("templates/chats.html", "utf8", function(err, data) {
            if(err) {throw err;};

            var compiled = templates(data, {username: post['username']});

            response.write(compiled);
            response.end();
        });
    });
}

var server = http.createServer();

var simpleRouter = function(request) {
    var method = request.method;
    var path = request.url;

    //handle the query
    var queryIndex = path.indexOf("?");
    if (queryIndex >= 0){
        path = request.url.slice(0, queryIndex);
    }

    //route input by user
    var providedRoute = {method: method, path: path};

    //available routes to navigate the user to 
    var routes = [
        {method: "GET", path: "/", handler: handleFormGet},
        {method: "POST", path: "/chats", handler: handleFormPost}
    ];

    for(i = 0; i < routes.length; i++){
        var route = routes[i];
        if(route.method === providedRoute.method && route.path === providedRoute.path){
            return route.handler;
        }
    }

    return null;
}

//on request
server.on("request", function(request, response){
    var handler = simpleRouter(request);

    if(handler != null) {
        handler(request, response);
    } else {
        response.writeHead(404);
        response.end();
    }
});

//client side to listen on port 3000
server.listen(3000, function(){
    console.log("Listening on port 3000");
});


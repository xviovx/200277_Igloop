var http = require("http");
var querystring = require("querystring");
var fs = require("fs");
var templates = require("es6-template-strings");

var io = require("socket.io-client");

var socket = io("http://localhost:8888", {transports: ["websocket"]});

var handleFormGet = function(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});

    //get template page
    fs.readFile("templates/signIn.html", "utf-8", function(err, data) {
        if(err) {throw err;};

        response.write(data);
        response.end();
    });
};

var handleFormPost = function(request, response){
    response.writeHead(200, {"Content-Type" : "text/html"});


    var payload = "";

    request.on("data", function(data) {
        payload += data;
    });

    request.on("end", function(){
        response.writeHead(200, {"Content-Type" : "text/html"});

        var post = querystring.parse(payload);

        socket.emit("login:data", post);

        if(post['username'] === "Kyle" && post['password'] === "abc123"){
            fs.readFile("templates/chats.html", "utf8", function(err, data) {
                if(err) {throw err;};
    
                var compiled = templates(data, {username: post['username']});
    
                response.write(compiled);
                response.end();
            });
        }else if(post['username'] === "Armand" && post['password'] === "easypassword123"){
            fs.readFile("templates/chats.html", "utf8", function(err, data) {
                if(err) {throw err;};
    
                var compiled = templates(data, {username: post['username']});
    
                response.write(compiled);
                response.end();
            });
        }else if(post['username'] === "Dexter" && post['password'] === "whenitrainsitpours"){
            fs.readFile("templates/chats.html", "utf8", function(err, data) {
                if(err) {throw err;};
    
                var compiled = templates(data, {username: post['username']});
    
                response.write(compiled);
                response.end();
            });
        }else{
            fs.readFile("templates/error.html", "utf8", function(err, data) {
                if(err) {throw err;};
    
                response.write(data);
                response.end();
            });
        }
    });
}

var server = http.createServer();

var simpleRouter = function(request) {
    var method = request.method;
    var path = request.url;

    var queryIndex = path.indexOf("?");
    if (queryIndex >= 0){
        path = request.url.slice(0, queryIndex);
    }

    var providedRoute = {method: method, path: path};

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

server.on("request", function(request, response){
    var handler = simpleRouter(request);

    if(handler != null) {
        handler(request, response);
    } else {
        response.writeHead(404);
        response.end();
    }
});


server.listen(3000, function(){
    console.log("Listening on port 3000");
});


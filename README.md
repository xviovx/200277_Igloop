# **_Igloop_ chat app** <img align="center" src="https://i.ibb.co/WPc6BhN/igloop.png" width="50px" height="40px" style="padding-left: 20px; padding-bottom: 20px">
<br>


## **Table of Contents**

1. [About the project](#about)
    * [Project Description](#description)
    * [Built With](#built-with)
2. [Getting started](#getting-started)
    * [Prerequisites and installation](#prerequisites)
3. [Features and functions](#features-and-functions)
    * [Server](#server)
    * [Client](#client)
4. [Concept process](#concept-process)
    * [Brand and colour scheme](#brand)
    * [Wireframes](#wireframes)
5. [Development process](#development-process)
    * [Implementation](#implementation)
6. [Video demonstration](#vid-demonstration)
7. [Authors](#authors)
8. [Contact](#contact)
9. [Acknowledgements](#acknowledgements)

<br>

<a name="about"></a>
##  **About the project**

<a name="description"></a>

### **Project description:**
Igloop was built utilsing NodeJS (a server-side Javascript framework that allows for the creation of websocket-based websites, web API's, and web services) and Socket.io. 

I was tasked with creating a server to host a chat room app, in which the user can login and take part in communication between two or more people. There is set login authentication for three users, and if the login details you enter are incorrect you'll be redirected to an error page. Igloop chat app has been structured as one big chat room, where all messages can be seen by all users. 

Login details:
* Username: **Kyle** | password: **abc123**
* Username: **Armand** | password: **easypassword123**
* Username: **Dexter** | password: **whenitrainsitpours**

<a name="built-with"></a>

### **Built with:**
Igloop, built with NodeJS and socket.io utilises two seperate folders, one for the client, where the template/HTML information is received, and one for the server, where the functionality to host the website is initialised.
<br>
<br>

<a name="getting-started"></a>
##  **Getting started**

<a name="prerequisites"></a>

### **Prerequisites and installation:**
First thing's first, you have to ensure you have NodeJS installed. To use NodeJS you'll first have to install NPM. You can do so by running the following command in the command line:

>npm install -g npm

After installing NPM, you can navigate to the NodeJS [download page](https://nodejs.org/en/download/) and download the NodeJS installation file.

After installing NodeJS you can verify that it is installed and working using the following commands:

>node -v
<br>
>npm -v

Ensure you also have the following additional dependancies installed:

>npm install "es6-template-strings"
<br>
npm install "node-static"

<br>

<a name="features-and-functions"></a>
##  **Features and functions**

<a name="server"></a>

### **Server:**
The server is what initiates the application. Using socket.io, I had to use the following command to initialise my server and install the necessary dependancies:

>node install socket.io
<br>

As well as ensuring all the necessary NPM dependancies are installed:

>npm install
<br>

I then setup my server on port 8888:

`var server = http.createServer();`

`server.listen(8888, function(){
    console.log("listening on port 8888.....");
});`

Because the users who connect to the server will be connecting to the client, which is setup on port 3000, I had to initialise the socket and put all functionality and communication being relayed between the client and the server within the .on("connection") function:

`var io = require("socket.io")(server);`

`io.on("connection", (socket) => {})`

Aside from this, my server also included an empty array, to store the usernames received from the client side, and a history variable equal to null. I also had to create a seperate history.txt file to store the chat history, as well as create two functions, one to get the history (whereby it reads the information in the history.txt file) and one to add to the history. This was so that, when new messages are added to the chat, they are added to this .txt file so that new users can see previous messages and so that the history remains on the page even after the server has been stopped.

<a name="client"></a>

### **Client:**
On the client side, I had to firstly initialise the socket.io functionality:

>npm install socket.io-client

As well as ensure that all the NPM dependancies were installed:

>npm install

I then initialised the client side by setting up the io and socket:

`var io = require("socket.io-client")`

`var socket = io("http://localhost:8888), {transports: ["websocket"]});`

Next, I had to setup a simple router to relay the necessary information to the appropriate paths using the correct handler, like so:


        {method: "GET", path: "/", handler: handleFormGet},
        {method: "POST", path: "/chats", handler: handleFormPost}

        for(i = 0; i < routes.length; i++){
        var route = routes[i];
        if(route.method === providedRoute.method && route.path === providedRoute.path){
            return route.handler;
        }}

        server.on("request", function(request, response){
        var handler = simpleRouter(request);

        if(handler != null) {
            handler(request, response);
        } else {
            response.writeHead(404);
            response.end();
        }



After setting up the router I had to create the appropriate route functions. The handle get function was used to read the _sign in_ page file and display it accordingly, and the handle post to display the appropriate _chat_ page if the user was authenticated. All user authentication functionality was also done in the handle post function, to relay the appropriate pages to the user based on the information they inputted. If the information entered by the user was not valid, they are redirected to the _error_ page, indicating that they are not a valid user.

All socket functionality (socket emits and on requests) was done on the chats.html page. This functionality included:
* Receiving the user list information (username for users logged in to the site) and writing it to the HTML page to showcase logged in users
* Receiving, adding, and displaying the chat history information.
* Receiving message information and author of message information, and, after it has been pushed to the array on the server side, displaying the messages on the _chats_ HTML page and allowing users to send new messages with a sendMessage() function.

<br>

<a name="concept-process"></a>
##  **Concept Process**

<a name="brand"></a>

### **Brand and colour scheme:**

In the ideation stage of development, I developed the brand identity, the logo, and the colour scheme of the _Igloop_ chat app:

<br>

<img src="https://i.ibb.co/HN2n4H6/Brand-and-colours.png">

The colour scheme was simplified when I developed the app to suit my needs at the time

<br>

<a name="wireframes"></a>

### **Wireframes:**

I designed the following wireframes for my _Igloop_ chat application:


<img src="https://i.ibb.co/M99hM1D/Sign-In.png" alt="Sign-In"></a>

**Sign in page**

<br>

<img src="https://i.ibb.co/ydM0vsT/Chat-page.png" alt="Chat-page"></a>

**Chats page**

This was an imperative step in the development process of the app.

<br>

<a name="development-process"></a>
##  **Development process**

<a name="implementation"></a>

### **Implementation:**

My app implementation process took the following course:

1. I first created the _sign in_ page - and did all the basic routing - to ensure that when I clicked the login button I would be redirected to the _chats_ page, and that it would show the name that I inputted on the _sign in_ page. This was done by setting up my server on port 8888 intitially, and reading the HTML _sign in_ page from the templates folder I created. I did this using the handle post and handle get request functions. The handle post function received the username data and parsed it (using a query string) to the HTML _chat_ page if the user was authenticated, where it would display to welcome the user

2. After finishing the functionality for the sign in page, I made it responsive using CSS media queries for the sake of professionalism and conforming to industry standards.

3. I then created the HTML files for the _error_ page (that shows if a user that isn't registered tries to sign in) and the _chats_ page. I put these files with their assets in the appropriate folders, and created a seperate directory for the client side and server side. 

4. I then initialised all my socket functionality, so as to have the client side (with all its appropriate functionality) as the port that the user connects to when joining the server (on port 3000).

5. Based on what I did in the previous step, I had to refactor my code so that the client.js file handles all the routing and the necessary user requests, and displays the necessary information to the user based on the method used.

6. I then did all the chat communication functionality on the actual _chats_ page. After initialising the socket, I emmited a series of requests between the client and the server to:
    * Receive the usernames logged in, push them to an array, and then display them for all users to see on the _chats_ page
    * Send a message function, which receives the user input, sends it to the server where it is pushed to the history.txt file, and then have it sent back where the messages are displayed on the _chats_ page for all logged in users to see. The command `io.emit` was utilised in order for all logged in users to see all the previous messages.
    * The actual history request and responses, to receive the chat history for the page (so that new users that log in can see previous messages in the chat) and so that when new messages are sent they are added to the history.txt file.

7. After finalising all funcitonality and ensuring that the app was working the way I wanted it to, I cleaned up a bit of the front-end for the _chats_ HTML page; including making it responsive. 

<br>

<a name="vid-demonstration"></a>
##  **Video Demonstration**

[Click here](https://youtu.be/ac9UyFX9LYU) to view video demonstration

<br>

<a name="authors"></a>
##  **Authors**

Developed by Kyle Pharoah (@xviovx)

<br>

<a name="contact"></a>
##  **Contact**

**Work email**: 200277@virtualwindow.co.za
<br>
<br>
**Personal email**: kyle03pharoah@gmail.com
<br>
<br>
**Twitter:** @xviovx
<br>
<br>
**Github:** xviovx 
<br>
<br>
https://github.com/xviovx/200277_Igloop

<br>

<a name="acknowledgements"></a>
##  **Acknowledgements**

* [**Open Window**](https://www.openwindow.co.za/)

<br>

* [**Stack overflow resources**](https://stackoverflow.com/questions/18947556/typeerror-cannot-read-property-0-from-undefined)
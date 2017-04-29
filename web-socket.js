// Steps
// 1. Check browser support
// 2. Create object
// 3. Connection with server
// 4. Set handler events
// 5. Exchange with server
// 6. Connection close

//Check browser support

//In console: window.WebSocket

//Js

// if (window.WebSocket){
//     console.log("BROWSER SUPPORTED");
// } else {
//     console.log("BROWSER NOT SUPPORTED");
//}

window.onload = function () {

    var label = document.getElementById('status');
    var message = document.getElementById('message');
    var btnSend = document.getElementById('send');
    var btnStop = document.getElementById('stop');

    var socket = new WebSocket('ws://echo.websocket.org/');
    //socket.bufferedAmount;

    btnSend.onclick = function () {
        /**
         *
         * WebSocket.CONNECTING
         * WebSocket.OPEN
         * WebSocket.CLOSING
         * WebSocket.CLOSED
         *
         **/
        if (socket.readyState === WebSocket.OPEN) {

            socket.send(message.value);

        }

    };

    btnStop.onclick = function () {

        if (socket.readyState === WebSocket.OPEN) {

            socket.close();

        }

    };
    socket.onopen = function (event) {

        console.log('Connected');
        label.innerHTML = 'Connected';
        label.innerHTML = 'Connected to address' + ' ' + socket.url;

    };

    socket.onclose = function (event) {

        console.log('Disconnected');
        label.innerHTML = 'Disconnected';
        var code = event.code;
        var reason = event.reason;
        var wasClean = event.wasClean;

        if (wasClean) {
            label.innerHTML = 'Connection was closed properly'
        } else {
            label.innerHTML = 'Connection was closed with error' + ' ' + reason;
        }

    };

    //If error connection will close immediately
    socket.onerror = function () {

        console.log('error');

    };

    //Response message
    socket.onmessage = function (event) {

        if (typeof event.data === 'string') {

            var serverMessage = ' Hi from server';
            label.innerHTML = event.data + serverMessage;

        }

    };
};
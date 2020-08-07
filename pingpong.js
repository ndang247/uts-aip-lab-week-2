const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

app.use(
    session({
        secret: 'tut-secrect',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    })
);

function increment(request){
    if (request.session.counter){
        request.session.counter++;
    } else {
        request.session.counter = 1;
    }
    return request.session.counter;
}



function pingHandler(request, response) {
    response.send(`<!DOCTYPE html>
                   <title>Ping</title>
                   <p>Ping?</p>
                   <form action="/pong" method="POST">
                   <p><input type="submit" value="Pong!"></p>
                   <p>Count is ${increment(request)}</p>
                   </form>`);
}

function pongHandler(request, response) {
    response.send(`<!DOCTYPE html>
                    <title>Pong</title>
                    <p>Pong?</p>
                    <form action="/" method="GET">
                    <p><input type="submit" value="Ping!"></p>
                    <p>Count is ${increment(request)}</p>
                    </form>`);
}

// Handle POSTed form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set up routes
app.get('/', pingHandler);
app.post('/pong', pongHandler);

// Start the server
console.log('Running on http://localhost:8080/');
app.listen(8080);
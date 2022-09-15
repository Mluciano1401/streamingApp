const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);

const userRouter = require('./routes/auth.routes');
require('./database/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', require('./routes/littlezoom.routes'));

app.use(express.static(`${__dirname}/public`));

app.use('/auth', userRouter);

io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        socket.broadcast.emit('stream', image);
    })
    socket.on('stop', ()=>{
        socket.off('stream')
    })
    socket.on('chat', (msg) => {
        socket.emit('chat', [msg, 1]);
        socket.broadcast.emit('chat', [msg, 0]);
    })
})


module.exports = http;
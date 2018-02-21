const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.broadcast.emit('msg', 'New connection: ' + socket.id);

  socket.on('msg', (message) => {
    socket.broadcast.emit('msg', socket.id + ' says: ' + message);
  })
});


http.listen(process.env.PORT || 3000, () => console.log('running at port ' + 3000));
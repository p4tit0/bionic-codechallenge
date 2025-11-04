const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { PORT, MONGO_URI } = require('./config');

const alarmRoutes = require('./routes/alarm');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  socket.on('disconnect', () => console.log('client disconnected', socket.id));
});

app.use(cors());
app.use(bodyParser.json());

app.use('/alarm', alarmRoutes);
app.use('/alarms', alarmRoutes);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
      console.log(`MongoDB connected: ${MONGO_URI}`);
    });
  })
  .catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });

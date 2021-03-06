const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

let artistRouter = require('./public/routes/artist-route');
app.use('/artists', artistRouter);

let songRouter = require('./public/routes/song-route');
app.use('/songs', songRouter);

const express= require('express');
const router = express.Router();

//source in PG
const pg = require('pg');

// set up PG to connect with DB!
const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: '5432',
    max: 10,
    idleTimeoutMillis: 3000000,
});

pool.on('connect', () => {
    console.log('postgreSQL connected! DopeWoot!');
});
//handles errors from the DB:
pool.on('error', error => {
    console.log('Error with postgre pool', error);    
});

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM songs;';
    pool.query(queryText)
        .then(dbResults => {
            res.send(dbResults.rows);
        })
        .catch((error) => {
            console.log(`Error! It broke trying to query ${queryText}`, error);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    const newSong = {
        title: req.body.title,
        length: req.body.length,
        released: req.body.released
    };
    console.log('the new song is:', newSong);

    const queryText = `INSERT INTO "songs" ("title", "length", "released")
                            VALUES ($1, $2, $3);`
                            // RETURNING "id";`;
    pool.query( queryText, [req.body.title, req.body.length, req.body.released] )
        .then(result => {
            console.log('the new song is:', result);
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`This didn't work. ${queryText}`, error);
            res.sendStatus(500);
        });
});

module.exports = router;
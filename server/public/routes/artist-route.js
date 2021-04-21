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
    let queryText = 'SELECT * FROM artists;';
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
    const newArtist = {
        name: req.body.name,
        birthdate: req.body.birthdate,
    };
    console.log('new artist is:', newArtist);
    
    const queryText = `INSERT INTO "artists" ("artist_name", "year_born")
                            VALUES ($1, $2)
                            RETURNING "id";`;
    pool.query( queryText, [req.body.name, req.body.birthdate] )
        .then(result => {
            console.log('The new artist is:', result);
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`This didn't work. ${queryText}`, error);
            res.sendStatus(500);
        })

})

module.exports = router;
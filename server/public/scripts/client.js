$(document).ready(onReady);

function onReady() {
    $('#submit-artist').on('click', function(event) {
        event.preventDefault();
        addArtist();
    });
    $('#submit-song').on('click', function(event) {
        event.preventDefault();
        addSong();
    });

    // load data from the server, put it on the DOM
    getArtists();
    getSongs();    
}

function addArtist() {
    // Get info to send to the server
    let payloadObject = {
        name: $('#artist-name').val(), 
        birthdate: $('#artist-born').val()
    }
    console.log('Adding artist', payloadObject);
    // Send the new artist to the server as data
    $.ajax({
        method: 'POST',
        url: '/artists',
        data: payloadObject
    }).then(function(response) {
        console.log(response);
        getArtists();
        $('#artist-name').val('');
        $('#artist-born').val('');
;    }).catch(function(error) {
        console.log('error in artist post', error); 
        alert('Error adding artist. Please try again later.')       
    });
}

function addSong() {
    // Get info to send to the server
    const newSong = {
        title: $('#song-name').val(), 
        length: $('#song-length').val(),
        released: $('#song-released').val()
    };

    console.log('Adding song', newSong);

    // Send the new artist to the server as data
    $.ajax({
        method: 'POST',
        url: '/songs',
        data: newSong
    }).then(function(response) {
        console.log(response);
        getSongs();
    }).catch(function(error) {
        console.log('error in song post', error); 
        alert('Error adding song. Please try again later.')       
    });
}

function getArtists() { 
    // get artist data from the server
    $.ajax({
        method: 'GET',
        url: '/artists'
    }).then(function(response) {
        const listOfArtists = response;
        renderArtists(response);
    }).catch(function (error) {
        console.log('error in artist get', error);
    });
}

function getSongs() {
    // get song data from the server
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then(function (response) {
        renderSongs(response);
    }).catch(function (error) {
        console.log('error in song get', error);
    });
}

function renderArtists( listOfArtists ) {
    // Empty previous data
    $('#artistTableBody').empty();

    // Add all artists to table
    for(let artist of listOfArtists) {
        $('#artistTableBody').append(`
                <tr>
                    <td>${artist.artist_name}</td>
                    <td>${artist.year_born}</td>
                </tr>`
        );
    }
}

function renderSongs(listOfSongs) {
    // Empty previous data
    $('#songTableBody').empty();
    // Add all songs to table
    for (let song of listOfSongs) {
        $('#songTableBody').append(`
                <tr>
                    <td>${song.title}</td>
                    <td>${song.length}</td>
                    <td>${song.released}</td>
                </tr>`
            );
    }
}
$(function() {

  //get random song ID
  var randomSongID = getRandomSongID(songIds);

  //get random song file
  getItunesData(randomSongID);

  //append random song title to DOM
  function getItunesData(songID) {

    $.ajax({
      url: 'https://itunes.apple.com/lookup?id=' + songID,
      dataType: 'jsonp'
    }).done(function(data) {
      var musicObject = data.results[0];
      // var musicURI = data.results[0].previewUrl;
      var html = '<audio id="audio_preview" src="' + musicObject.previewUrl + '" autoplay></audio>'
      $('body').append(html);
      $('#answer').attr('value', musicObject.trackName);
    });
  }

  //get form input

  $('form').on('submit', function(event) {
    event.preventDefault();
    var songTitle = $('#song-title').val();
    var songTitleAnswer = $('#answer').val();
    console.log(songTitleAnswer);
    if (songTitle === songTitleAnswer) {
      $('#response').text('Nailed it!')
    } else {
      $('#response').text("Welp, you suck.")
    }
  })

});

//helpers

function getRandomSongID(songArray) {
  var randomID = songArray[Math.floor(Math.random()*(songArray.length))];
  return randomID;
}

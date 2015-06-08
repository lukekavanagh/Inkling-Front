$(window).load(function () {
  $('#Ethereal').trigger('play');
   
document.getElementById('Ethereal').addEventListener('ended', function () {
	this.currentTime = 0;
	this.play();
}, false);

});


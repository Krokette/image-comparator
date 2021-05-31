var loadFileBefore = function(event) {
	var image = document.getElementById('before');
	image.src = URL.createObjectURL(event.target.files[0]);
};
var loadFileAfter = function(event) {
	var image = document.getElementById('after');
	image.src = URL.createObjectURL(event.target.files[0]);
    initComparisons();
};
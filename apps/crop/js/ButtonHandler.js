$(document).ready(function() {
	if (userImage) {
		$('#resetimg').click(function() {
			tempImage = userImage;
		});
		$('#saveimg').click(function() {
			tempImage.save('croppedImage');
		});
	}
	else {
		document.getElementById('imagefile').addEventListener('change', function() {

			var file = this.files[0];
			var imageType = /image.*/;
			var fileDisplayArea = document.getElementById('uploadform');

			if (file.type.match(imageType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					// Create a new image.
					var img = new Image();
					img.src = reader.result;
				};

				userImage = reader.readAsDataURL(img);
				tempImage = userImage;
				console.log("test");
			}

			// console.log("name : " + tempImage.name);
			// console.log("size : " + tempImage.size);
			// console.log("type : " + tempImage.type);
			// console.log("date : " + tempImage.tpye);
		}, false);
	}

});

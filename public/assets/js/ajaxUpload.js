$('#upload-photos').on('submit', function (event) {
    event.preventDefault();
    var files = $('#photos').get(0).files,
        formData = new FormData();
    if (files.length === 0) {
        alert('Select atleast 1 file to upload.');
        return false;
    }
    // Append the files to the formData.
    for (var i=0; i < files.length; i++) {
        var file = files[i];
        formData.append('photos[]', file, file.name);
    }
	// Handle Photos Upload
	uploadPhotos(formData);
});


function uploadPhotos(formData) {
    $.ajax({
        url: '/upload_photos',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', function (event) {
                var progressBar = $('.progress-bar');
                if (event.lengthComputable) {
                    var percent = (event.loaded / event.total) * 100;
                    progressBar.width(percent + '%');
                    if (percent === 100) {
                        progressBar.removeClass('active');
                    }
                }
            });
            return xhr;
        }
    }).done(showPhotos).fail(function (xhr, status) {
        alert(status);
    });
}
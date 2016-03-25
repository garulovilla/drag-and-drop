function init() {
	dropSection = document.getElementById('drop');
	progressSection = document.getElementById('progress');
	filesSection = document.getElementById('files');
	fileList = [];
    dropSection.addEventListener('dragenter', handleDragEnter, false);
    dropSection.addEventListener('dragleave', handleDragLeave, false);
    dropSection.addEventListener('dragover', handleDragOver, false);
    dropSection.addEventListener('drop', handleDrop, false);
}

// Handre Drag and Drop

function handleDragEnter(e) {
	e.preventDefault();
    dropSection.classList.add('box-in');
}

function handleDragLeave(e) {
	e.preventDefault();
    dropSection.classList.remove('box-in');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
	e.preventDefault();
	dropSection.classList.remove('box-in');
    processFiles(e.dataTransfer.files);
}

// Functions

function processFiles(files) {
    if (!files || !files.length)
        return;
    for (var i = 0; i < files.length; i++) {
		fileList.push(files[i]);
    }
	loadNextFile();
}

function loadNextFile() {
	if(fileList.length) {
		// The shift() method removes the first item of an array, and returns that item.
		uploadFile(fileList.shift());
	}
}

// Send to server

function uploadFile(file) {
	// XMLHttpRequest
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'upload.php', true);
	xhr.onload = function(e) {
		if(this.responseText != 'error') {
			filesSection.innerHTML += '<p class="sucess">' + this.responseText + '<span>Success</span></p>';
		} else {
			filesSection.innerHTML += '<p class="error">Upload wrong<span>Error</span></p>';
		}
		loadNextFile();
	};
	xhr.onerror = function(e) {
		console.log('error: ' +this.responseText);
		loadNextFile();
	};
	// Handle Uploads - Progress Bar
	xhr.upload.onloadstart = function (e) {
		progressSection.innerHTML = '<p></p><progress value="0" max="100" class="progress-bar"></progress>';
	};
	xhr.upload.onprogress = function(e) {
		if (e.lengthComputable) {
	        var percentage = parseInt(e.loaded / e.total * 100);
	        var progressBar = progressSection.querySelector('progress');
			var percentageText = progressSection.querySelector('p');
	        progressBar.value = percentage;
	        percentageText.innerHTML = percentage + '%';
	    }
	};
	xhr.upload.onload = function (e) {
	};

	// FormData
	var formData = new FormData();
	formData.append('file', file);
	xhr.send(formData);
}

window.addEventListener('load', init, false);

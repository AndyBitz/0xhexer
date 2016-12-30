function config() {

	this.numberOfBytesPerRow = 8;
	this.numberOfRowsPerPage = 128;

	this.initConfigPage();

}


config.prototype.initConfigPage = function() {

	this.applyButton = document.getElementById('applyChanges');
	this.numberOfBytesPerRowInput = document.getElementById('numberOfBytesPerRow');
	this.numberOfRowsPerPageInput = document.getElementById('numberOfRowsPerPage');

	this.updateForm();

	this.applyButton.addEventListener('click', this.applyChanges.bind(this));

};


config.prototype.applyChanges = function() {

	this.saveChanges();

	if (h.buffer != undefined)
		h.createHexPage();

	this.updateForm();

};


config.prototype.saveChanges = function() {

	this.numberOfBytesPerRow = this.numberOfBytesPerRowInput.value;
	this.numberOfRowsPerPage = this.numberOfRowsPerPageInput.value;

};


config.prototype.updateForm = function() {

	this.numberOfBytesPerRowInput.value = this.numberOfBytesPerRow;
	this.numberOfRowsPerPageInput.value = this.numberOfRowsPerPage;

};
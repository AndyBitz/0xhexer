function config() {

	this.options = [
		{
			name: 'numberOfBytesPerRow',
			input: document.getElementById('numberOfBytesPerRow'),
			value: parseInt(getCookie('numberOfBytesPerRow')) || 8,
			default: 8
		},
		{
			name: 'numberOfRowsPerPage',
			input: document.getElementById('numberOfRowsPerPage'),
			value: parseInt(getCookie('numberOfRowsPerPage')) || 128,
			default: 128
		}
	];

	this.initConfigPage();

}


config.prototype.initConfigPage = function() {

	this.updateForm();

	document.getElementById('applyChanges')
		.addEventListener('click', this.applyChanges.bind(this));

	document.getElementById('resetConfig')
		.addEventListener('click', this.resetConfig.bind(this));

};


config.prototype.applyChanges = function() {

	for (let i=0; i < this.options.length; i++) {
		this.options[i].value = this.options[i].input.value;		// update option values
		// this.options[i].input.value = this.options[i].value;		// update form
		setCookie(this.options[i].name, this.options[i].value);		// update cookies
	}

	if (h.buffer != undefined)
		h.createHexPage();
};


config.prototype.resetConfig = function() {
	for (let i=0; i < this.options.length; i++) {
		this.options[i].value = this.options[i].default;			// update option values
		this.options[i].input.value = this.options[i].default;		// update form
		setCookie(this.options[i].name, this.options[i].value);		// update cookies
	}
};


config.prototype.updateCookies = function() {
	for (let i=0; i < this.options.length; i++) {
		setCookie(this.options[i].name, this.options[i].value);
	}
};


config.prototype.updateForm = function() {
	for (let i=0; i < this.options.length; i++) {
		this.options[i].input.value = this.options[i].value;		// update form
	}
};
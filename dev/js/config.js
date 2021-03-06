function Config() {

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
		},
		{
			name: 'cellSize',
			input: document.getElementById('cellSize'),
			value: parseInt(getCookie('cellSize')) || 1,
			default: 1
		},
		{
			name: 'asciiFieldSize',
			input: document.getElementById('asciiFieldSize'),
			value: parseInt(getCookie('asciiFieldSize')) || 1,
			default: 1
		},
	];

	this.initConfigPage();

}


Config.prototype.initConfigPage = function() {

	this.updateForm();
	this.dependetValues();

	document.getElementById('applyChanges')
		.addEventListener('click', this.applyChanges.bind(this));

	document.getElementById('resetConfig')
		.addEventListener('click', this.resetConfig.bind(this));

};


Config.prototype.applyChanges = function() {

	for (let i=0; i < this.options.length; i++) {
		if (this.options[i].input.nodeName === "INPUT") {
			this.options[i].value = this.options[i].input.value;		// update option values
			// this.options[i].input.value = this.options[i].value;		// update form
			setCookie(this.options[i].name, this.options[i].value);		// update cookies
		} else if (this.options[i].input.nodeName === "SELECT") {
			let selected_index = this.options[i].input.options.selectedIndex;			// get selected index
			let updated_value = this.options[i].input.options[selected_index].value;	// get updated value
			this.options[i].value = updated_value;										// update option values
			setCookie(this.options[i].name, updated_value);								// update cookies
		}
	}

	Toast('Changes have been applied!');

	if (h.buffer != undefined)
		h.createHexPage();
};


Config.prototype.resetConfig = function() {
	for (let i=0; i < this.options.length; i++) {
		if (this.options[i].input.nodeName === "INPUT") {
			this.options[i].value = this.options[i].default;			// update option values
			this.options[i].input.value = this.options[i].default;		// update form
			setCookie(this.options[i].name, this.options[i].value);		// update cookies
		} else if (this.options[i].input.nodeName === "SELECT") {
			this.options[i].value = this.options[i].default;			// update option value
			this.options[i].input.options.selectedIndex = 0;			// update form
			setCookie(this.options[i].name, this.options[i].value);		// update cookies
		}
	}
};


Config.prototype.updateCookies = function() {
	for (let i=0; i < this.options.length; i++) {
		setCookie(this.options[i].name, this.options[i].value);
	}
};


Config.prototype.updateForm = function() {
	for (let i=0; i < this.options.length; i++) {
		if (this.options[i].input.nodeName === "INPUT") {
			this.options[i].input.value = this.options[i].value;		// update form
		} else if (this.options[i].input.nodeName === "SELECT") {
			let opt_array = this.options[i].input.options;;
			for (let j=0; j < opt_array.length; j++) {
				if (opt_array[j].value == this.options[i].value) {
					opt_array.selectedIndex = j;
				}
			}
		}
	}
};


Config.prototype.getValue = function(name) {

	for (let i=0; i < this.options.length; i++) {
		if (this.options[i].name == name)
			return this.options[i].value;
	}

};


Config.prototype.dependetValues = function() {

	// hex cell size & number of bytes per row
	const cellSize = this.options[2];
	const numberOfBytesPerRow = this.options[0];
	cellSize.input.addEventListener('change', ()=>{
		numberOfBytesPerRow.input.step = cellSize.input.options[cellSize.input.options.selectedIndex].value;
		numberOfBytesPerRow.input.value = cellSize.input.options[cellSize.input.options.selectedIndex].value;
		numberOfBytesPerRow.input.dispatchEvent(new Event('change'));
	});
	numberOfBytesPerRow.input.step = cellSize.input.options[cellSize.input.options.selectedIndex].value;


	// ASCII field size shall not be bigger than bytes per row
	const asciiFieldSize = this.options[3];
	numberOfBytesPerRow.input.addEventListener('change', ()=>{
		asciiFieldSize.input.max = numberOfBytesPerRow.input.value;
		if (asciiFieldSize.input.value > numberOfBytesPerRow.input.value) {
			asciiFieldSize.input.value = numberOfBytesPerRow.input.value;
		}
	});
	asciiFieldSize.input.max = numberOfBytesPerRow.input.value;

};
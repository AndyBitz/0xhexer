/* Convert a value (0-255) to an ASCII character
 * for the ASCII Row.
 * Characters that cannot be converted will be shown as a dot.
 */
function toAscii(val) {

	if (val > 126 || val < 32)
		return '.';

	switch (val) {
		case 32:
			return ' ';

		case 33:
			return '!';

		case 34:
			return '.';		// should be " but since html will see it as end of the attribute value it will be a dot

		case 35:
			return '#';

		case 36:
			return '$';

		case 37:
			return '%';

		case 38:
			return '&';

		case 39:
			return '\'';

		case 40:
			return '(';

		case 41:
			return ')';

		case 42:
			return '*';

		case 43:
			return '+';

		case 44:
			return ',';

		case 45:
			return '-';

		case 46:
			return '.';

		case 47:
			return '/';

		case 48:
			return '0';

		case 49:
			return '1';

		case 50:
			return '2';

		case 51:
			return '3';

		case 52:
			return '4';

		case 53:
			return '5';

		case 54:
			return '6';

		case 55:
			return '7';

		case 56:
			return '8';

		case 57:
			return '9';

		case 58:
			return ':';

		case 59:
			return ';';

		case 60:
			return '<';

		case 61:
			return '=';

		case 62:
			return '>';

		case 63:
			return '?';

		case 64:
			return '@';

		case 65:
			return 'A';

		case 66:
			return 'B';

		case 67:
			return 'C';

		case 68:
			return 'D';

		case 69:
			return 'E';

		case 70:
			return 'F';

		case 71:
			return 'G';

		case 72:
			return 'H';

		case 73:
			return 'I';

		case 74:
			return 'J';

		case 75:
			return 'K';

		case 76:
			return 'L';

		case 77:
			return 'M';

		case 78:
			return 'N';

		case 79:
			return 'O';

		case 80:
			return 'P';

		case 81:
			return 'Q';

		case 82:
			return 'R';

		case 83:
			return 'S';

		case 84:
			return 'T';

		case 85:
			return 'U';

		case 86:
			return 'V';

		case 87:
			return 'W';

		case 88:
			return 'X';

		case 89:
			return 'Y';

		case 90:
			return 'Z';

		case 91:
			return '[';

		case 92:
			return '\\';

		case 93:
			return ']';

		case 94:
			return '^';

		case 95:
			return '_';

		case 96:
			return '`';

		case 97:
			return 'a';

		case 98:
			return 'b';

		case 99:
			return 'c';

		case 100:
			return 'd';

		case 101:
			return 'e';

		case 102:
			return 'f';

		case 103:
			return 'g';

		case 104:
			return 'h';

		case 105:
			return 'i';

		case 106:
			return 'j';

		case 107:
			return 'k';

		case 108:
			return 'l';

		case 109:
			return 'm';

		case 110:
			return 'n';

		case 111:
			return 'o';

		case 112:
			return 'p';

		case 113:
			return 'q';

		case 114:
			return 'r';

		case 115:
			return 's';

		case 116:
			return 't';

		case 117:
			return 'u';

		case 118:
			return 'v';

		case 119:
			return 'w';

		case 120:
			return 'x';

		case 121:
			return 'y';

		case 122:
			return 'z';

		case 123:
			return '{';

		case 124:
			return '|';

		case 125:
			return '}';

		case 126:
			return '~';

		default:
			return '.';

	}

}
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


config.prototype.initConfigPage = function() {

	this.updateForm();
	this.dependetValues();

	document.getElementById('applyChanges')
		.addEventListener('click', this.applyChanges.bind(this));

	document.getElementById('resetConfig')
		.addEventListener('click', this.resetConfig.bind(this));

};


config.prototype.applyChanges = function() {

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

	if (h.buffer != undefined)
		h.createHexPage();
};


config.prototype.resetConfig = function() {
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


config.prototype.updateCookies = function() {
	for (let i=0; i < this.options.length; i++) {
		setCookie(this.options[i].name, this.options[i].value);
	}
};


config.prototype.updateForm = function() {
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


config.prototype.getValue = function(name) {

	for (let i=0; i < this.options.length; i++) {
		if (this.options[i].name == name)
			return this.options[i].value;
	}

};


config.prototype.dependetValues = function() {

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
/* Returns the value of a cookie.
 * If the cookie is not set it will return null.
 *
 */
function getCookie(name) {

	let cookies = document.cookie.split(';');
	for (let i=0; i < cookies.length; i++) {
		let biscuit = cookies[i].split('=');
		if (biscuit[0].trim() == name) {
			return biscuit[1];
		}

	}

	return null;

}


function setCookie(name, value) {
	document.cookie = `${name}=${value}`;
}
 

/* Loops through array of DOM-Elements and adds a event to every one of them.
 * Don't use this on too much elements.
 * Use window.addEventListener() instead.
 */
function addEventToArray(array, event_type, event_function) {
	for (let i=0; i < array.length; i++) {
		array[i].addEventListener(event_type, event_function);
	}
}


/* Loops through an array of DOM-Elements and allows
 * to set on data type of them all to a specific value.
 *
 */
function setDataOfArray(array, data_type, data) {
	for (let i=0; i < array.length; i++) {
		array[i][data_type] = data;
	}
}
function hexer() {

	this.init_u_area();
	this.saveFile();

}


hexer.prototype.init_u_area = function() {
	this.uarea = document.getElementById('uploader');
	this.uareaicon = document.querySelector('#uploader .up-event');
	this.inputfield = document.getElementById('fileoc');

	/* Click handling.
	 *
	 */
	this.uareaicon.addEventListener('click', (e)=>{
		this.inputfield.click();
	});

	this.inputfield.addEventListener('change', (e)=>{
		if (e.target.files.length > 1) {
			
		}
		this.fileHandler(e.target.files[0]);
	});

	/* Drag Events and handling.
	 *
	 */
	this.uarea.addEventListener('dragenter', (e)=>{
		this.uareaicon.className += ' drop-ready';
	});

	this.uarea.addEventListener('dragover', (e)=>{
		e.preventDefault();
	});

	this.uarea.addEventListener('dragleave', (e)=>{
		this.uareaicon.className = this.uareaicon.className.replace(' drop-ready', '');
	});

	this.uarea.addEventListener('drop', (e)=>{
		e.preventDefault();
		
		if (e.dataTransfer.files.length > 1) {
			Toast('Only one file is allowed');
		}

		this.fileHandler(e.dataTransfer.files[0]);
		this.uareaicon.className = this.uareaicon.className.replace(' drop-ready', '');
	});

};


hexer.prototype.fileHandler = function(file) {
	this.file = file;
	this.readFile();
};


hexer.prototype.readFile = function() {
	const fr = new FileReader();
	this.buffer;

	fr.onloadstart = (e)=>{
		document.getElementById('up-status').className = 'soft-blink';
		Toast('Reading file.', Toast.SHORT);
	};

	fr.onloadend = (e)=>{
		document.getElementById('up-status').className = 'done';
		Toast('File has been read.', Toast.SHORT);
		this.buffer = new Uint8Array(e.target.result);
		this.createHexPage();
	};

	fr.readAsArrayBuffer(this.file);
};


hexer.prototype.createHexPage = function() {
	this.hexPage = document.getElementById('hex-view');

	this.bytesPerRow	= c.getValue('numberOfBytesPerRow');	// define bytes that are shown per row
	this.pageRows 		= c.getValue('numberOfRowsPerPage');	// define rows of one section
	this.cellSize		= c.getValue('cellSize');				// define size of one cell
	this.asciiFieldSize	= c.getValue('asciiFieldSize');			// define size of an asii-cell
	this.currentSection	= 0;									// init current Section

	if (this.bytesPerRow%this.cellSize != 0) {
		this.bytesPerRow = this.cellSize*2;
	}

	this.totalRows		= this.file.size/this.bytesPerRow;				// define total rows
	this.totalSections	= Math.floor(this.totalRows/this.pageRows);		// define total Sections;

	setDataOfArray(
		document.querySelectorAll('[data-sec-data="sec-total"]'),
		'textContent',
		this.totalSections
		);

	setDataOfArray(
		document.querySelectorAll('[data-sec-data="sec-cur"]'),
		'value',
		this.currentSection
		);

	addEventToArray(
		document.querySelectorAll('[data-sec-data="sec-cur"]'),
		'keyup',
		(e)=>{
			if (e.key == "Enter") {
				this.currentSection = e.target.value;
				this.loadSection();
			}
		}
		);

	addEventToArray(
		document.querySelectorAll('[data-sec-action="sec-skip"]'),
		'click',
		(e)=>{
			let sc = document.querySelectorAll('[data-sec-data="sec-cur"]');
			for (let j=0; j < sc.length; j++) {
				if (sc[j].value != this.currentSection) {
					this.currentSection = sc[j].value;
					break;
				}
			}
			this.loadSection();
		}
		);

	addEventToArray(
		document.querySelectorAll('[data-sec-action="sec-next"]'),
		'click',
		this.nextSection.bind(this)
		);

	addEventToArray(
		document.querySelectorAll('[data-sec-action="sec-prev"]'),
		'click',
		this.previousSection.bind(this)
		);

	// up buttons
	addEventToArray(
		document.querySelectorAll('.go-up'),
		'click',
		(e)=>{
			document.querySelector('[data-page-id="hex-view"]').scrollTop = 0;
		});

	// down buttons
	addEventToArray(
		document.querySelectorAll('.go-down'),
		'click',
		(e)=>{
			let s = document.querySelector('[data-page-id="hex-view"]');
			s.scrollTop = s.scrollHeight - s.offsetHeight;
		});

	this.loadSection();
	p.loadPageById('hex-view');

	/* STYLE */
	let placeSectionTools = ()=>{
		if (mq.desktop) {
			document.getElementById('sec-tools-desktop').style.left = (this.hexPage.offsetWidth + 12) + "px"; // +12 because of padding
		}
	};
	placeSectionTools();
	window.addEventListener('resize', placeSectionTools.bind(this));
	/* STYLE */
};


hexer.prototype.loadSection = function() {

	if (this.currentSection < 0 || this.currentSection > this.totalSections)
		this.currentSection = 0;

	let output = '';
	let row_counter = 0 + (this.currentSection*this.pageRows);
	let c = 0 + (this.currentSection*this.pageRows*this.bytesPerRow);

	let end_page = false;
	let lastRow = '';
	// generate section
	for (let i=0; i < this.pageRows; i++) {

		// start row
		output += `<div data-row-nr="${row_counter++}">`;
		let ascii_row = '';

		// generate both rows
		for (let j=0; j < this.bytesPerRow; j++, c++) {
			if (this.buffer[c] == undefined) { end_page = true; break; }
			ascii_row	+= `<input maxlength="1" class="ascii-field" data-slice="${c}" value="${toAscii(this.buffer[c])}">`;
		}

		if (end_page)
			lastRow = `style="width: ${document.querySelector('.hex-row').clientWidth}px;" `;

		// output += `<div ${lastRow}class="hex-row">${this.generateHexRow(i)}</div><div class="ascii-row">${ascii_row}</div>`;
		output += `<div ${lastRow}class="hex-row">${this.generateHexRow(i)}</div><div class="ascii-row">${this.generateAsciiRow(i)}</div>`;

		// end row
		output += `</div>`;

		if (end_page) break;
	}

	setDataOfArray(
		document.querySelectorAll('[data-sec-data="sec-cur"]'),
		'value',
		this.currentSection );

	this.hexPage.innerHTML = output;
	this.init_workspace();
};


hexer.prototype.generateAsciiRow = function(counter) {
	let ret	= '';
	let c	= counter*(this.bytesPerRow)+(this.currentSection*this.pageRows*h.bytesPerRow);

	for (let i=0; i < (this.bytesPerRow/this.asciiFieldSize); i++, c += parseInt(this.asciiFieldSize)) {

		let value = '';
		let slice = [];
		let end_page = false;

		for (let j=0; j < this.asciiFieldSize; j++) {

			if (this.buffer[c+j] == undefined) {
				end_page = true;
				break;
			}

			value += toAscii(this.buffer[c+j]);
			slice.push(c+j);
		}
		
		if (end_page) {
			if (value != '')
				ret += `<input maxlength="${value.length}" class="ascii-field" data-slice="${slice.toString()}" value="${value}">`;
		} else {
			ret	+= `<input maxlength="${value.length}" class="ascii-field" data-slice="${slice.toString()}" value="${value}">`;
		}
	}

	return ret;
};


hexer.prototype.generateHexRow = function(counter) {
	let ret	= '';
	let c	= counter*(this.bytesPerRow)+(this.currentSection*this.pageRows*h.bytesPerRow);

	for (let i=0; i < (this.bytesPerRow/this.cellSize); i++, c += parseInt(this.cellSize)) {

		let value = '';
		let slice = [];
		let end_page = false;

		for (let j=0; j < this.cellSize; j++) {

			if (this.buffer[c+j] == undefined) {
				end_page = true;
				break;
			}

			value += hexer.fillUpByte(this.buffer[c+j].toString(16));
			slice.push(c+j);
		}
		
		if (end_page) {
			if (value != '')
				ret += `<input maxlength="${value.length}" class="hex-field" data-slice="${slice.toString()}" value="${value}">`;
		} else {
			ret	+= `<input maxlength="${value.length}" class="hex-field" data-slice="${slice.toString()}" value="${value}">`;
		}
	}

	return ret;
};


hexer.fillUpByte = (byte, size=2)=>{

	if (byte.length == size)
		return byte;

	let filler = '';

	for (let i=1; i < size; i++) {
		filler += '0';
	}
	
	return `${filler}${byte}`;

};


hexer.prototype.nextSection = function() {
	this.currentSection++;
	if (this.currentSection > this.totalSections)
		this.currentSection = this.totalSections;

	this.loadSection();
};


hexer.prototype.previousSection = function() {
	this.currentSection--;
	if (this.currentSection < 0)
		this.currentSection = 0;

	this.loadSection();
};


hexer.prototype.init_workspace = function() {

	const cHandler = (e)=>{

		if (e.target.nodeName != 'INPUT')
			return;

		const rm = document.querySelectorAll('.active');
		const ds = e.target.getAttribute('data-slice').split(',');	// data-slice
		const ds_arr = [];

		for (let i=0; i < rm.length; i++) {
			rm[i].className = rm[i].className.replace(/ active||active/g, '');
		}

		e.target.className += ' active';
		e.target.select();

		if ( e.target.className.match(/hex-field/g) ) {
			// if hex-field is selected

			// get the correct data-slice value
			let start_value = ds[0];

			while (start_value%this.asciiFieldSize != 0) {
				if (start_value <= 0) break;
				start_value--;
			}
			ds_arr.push(start_value);
			for (let i=1; i < this.asciiFieldSize; i++) {
				ds_arr.push( parseInt(ds_arr[0]) + parseInt(i));
			}
			document.querySelector(`input.ascii-field[data-slice="${ds_arr.toString()}"]`).className += ' active';


		} else if ( e.target.className.match(/ascii-field/g) ) {
			// if ascii-field is selected

			// get the correct data-slice value
			let start_value = ds[0];

			while (start_value%this.cellSize != 0) {
				if (start_value <= 0) break;
				start_value--;
			}
			ds_arr.push(start_value);
			for (let i=1; i < this.cellSize; i++) {
				ds_arr.push( parseInt(ds_arr[0]) + parseInt(i));
			}
			document.querySelector(`input.hex-field[data-slice="${ds_arr.toString()}"]`).className += ' active';
		}

	};


	const kHandler = (e)=>{

		if (e.target.nodeName != 'INPUT')
			return;

		// array that contains all data-slices that got changed
		const ds = e.target.getAttribute('data-slice').split(',');

		let	cvm,	// changed value map
			cv,		// complete value of field
			pf,		// partner field
			pfv;	// partner field value

		if ( e.target.className.match(/hex-field/g) ) {
			// if hex-field is changed

			// create map of every changed value
			cvf = [];
			cv = document.querySelector(`input.hex-field[data-slice="${ds.toString()}"]`).value;
			try {
				for (let i=0; i < ds.length; i++) {
					cvf.push({
						'data-slice'		: ds[i],
						'new-value-dec'		: parseInt((cv[i+i]+cv[i+i+1]), 16)
					});
				}

				// update buffer
				for (let i=0; i < cvf.length; i++) {
					this.buffer[cvf[i]['data-slice']] = cvf[i]['new-value-dec'];
					this.updateAsciiFieldFromBuffer(cvf[i]['data-slice']);
				}
			} catch(e) {
				// TODO add error field to target
			}

		} else if ( e.target.className.match(/ascii-field/g) ) {
			// if ascii-field is changed

			// create map of every changed value
			cvf = [];
			cv = document.querySelector(`input.ascii-field[data-slice="${ds.toString()}"]`).value;
			try {
				for (let i=0; i < ds.length; i++) {
					cvf.push({
						'data-slice'		: ds[i],
						'new-value-dec'		: cv[i].charCodeAt(0)
					});			
				}

				// update buffer
				for (let i=0; i < cvf.length; i++) {
					this.buffer[cvf[i]['data-slice']] = cvf[i]['new-value-dec'];
					this.updateHexFieldFromBuffer(cvf[i]['data-slice']);
				}
			} catch(e) {
				// TODO add error field to target
			}
		}

	};


	this.hexPage.addEventListener('keyup', kHandler.bind(this));
	this.hexPage.addEventListener('click', cHandler.bind(this));

};


hexer.prototype.updateAsciiFieldFromBuffer = function(data_slice) {

	// get the correct data-slice value
	let start_value = parseInt(data_slice);
	let ds_arr = [];

	while (start_value%this.asciiFieldSize != 0) {
		if (start_value <= 0) break;
		start_value--;
	}
	ds_arr.push(start_value);
	for (let i=1; i < this.asciiFieldSize; i++) {
		ds_arr.push( parseInt(ds_arr[0]) + parseInt(i) );
	}
	// partner field
	let pf = document.querySelector(`input.ascii-field[data-slice="${ds_arr.toString()}"]`);

	let value_buffer = '';
	for (let i=0; i < this.asciiFieldSize; i++) {
		value_buffer += toAscii(this.buffer[ds_arr[i]]);
	}
	pf.value = value_buffer;

};


hexer.prototype.updateHexFieldFromBuffer = function(data_slice) {

	// get the correct data-slice value
	let start_value = parseInt(data_slice);
	let ds_arr = [];

	while (start_value%this.cellSize != 0) {
		if (start_value <= 0) break;
		start_value--;
	}
	ds_arr.push(start_value);
	for (let i=1; i < this.cellSize; i++) {
		ds_arr.push( parseInt(ds_arr[0]) + parseInt(i) );
	}
	// partner field
	let pf = document.querySelector(`input.hex-field[data-slice="${ds_arr.toString()}"]`);

	let value_buffer = '';
	for (let i=0; i < this.cellSize; i++) {
		value_buffer += hexer.fillUpByte(this.buffer[ds_arr[i]].toString(16));
	}
	pf.value = value_buffer;

};


hexer.prototype.saveFile = function() {


	document.getElementById('savefile').addEventListener('click', (e)=>{

		if (this.buffer != undefined) {

			let b = new Blob([this.buffer.buffer], {"type": "application/octet-binary"});
			let u = URL.createObjectURL(b);
			document.getElementById('download-file').href = u;
			document.getElementById('download-file').download = this.file.name;
			document.getElementById('download-file').click();

		} else {
			Toast('You have to load a file in order to save it.', Toast.SHORT);
		}

	});

};
function pages() {

	// variables
	this.pages			= document.querySelectorAll('.pages .page[data-page-id]');
	this.defaultPage	= this.pages[0].getAttribute('data-page-id');
	this.currentPage	= this.defaultPage;

	this.previousPage	= [];

	// inits
	this.initBackButtons();
	this.initURLs();

	// 
	if (window.location.pathname != '/') {
		this.loadPageById(window.location.pathname.replace('/', ''));
	} else {
		this.loadPageById(this.defaultPage);
	}

	// events
	window.addEventListener('popstate', (e)=>{
		e.preventDefault();
		this.loadPreviousPage(this.previousPage.pop() || this.defaultPage);
	});

}


pages.prototype.initURLs = function() {

	let elem = document.querySelectorAll('[data-page-url]');
	for (let i=0; i < elem.length; i++) {

		let pageId = elem[i].getAttribute('data-page-url');

		elem[i].addEventListener('click', (e)=>{
			this.loadPageById(pageId);
		});
	}

};


pages.prototype.initBackButtons = function() {
	addEventToArray(
		document.getElementsByClassName('back-btn'),
		'click',
		(e)=>{history.back();}
		);
};


pages.prototype.loadPreviousPage = function(sp) {
	let p = document.querySelector(`[data-page-id="${sp}"]`);
	if (p == undefined) {
		console.error("Back: Page does not exist!");
		Toast('Back: Page does not exist!', Toast.SHORT);
	} else {
		this.currentPage = sp;

		history.replaceState(null, '', sp);

		this.hideAllPages();
		this.showCurrentPage();
	}

};


pages.prototype.loadPageById = function(sp) {
	let p = document.querySelector(`[data-page-id="${sp}"]`);
	if (p == undefined) {
		console.error("Page does not exist!");
		Toast('Page does not exist!', Toast.SHORT);
	} else {
		this.previousPage.push(this.currentPage);
		this.currentPage = sp;
		this.loadPage();
	}

};


pages.prototype.loadPage = function() {

	// don't load /hex-view if no file is loaded
	if (this.currentPage == 'hex-view') {
		if (h == undefined || h.buffer == undefined) {
			this.currentPage = 'load';
		}
	}

	history.pushState(null, '', this.currentPage);
	this.hideAllPages();
	this.showCurrentPage();
};


	pages.prototype.hideAllPages = function() {
		for (var i=0; i < this.pages.length; i++) {
			this.pages[i].style.display = 'none';
		}
	};


	pages.prototype.showCurrentPage = function() {
		document
			.querySelector(`[data-page-id="${this.currentPage}"]`)
			.style.display = 'block';
	};
function settings() {

	this.currentStatus = 'CLOSE';
	document.getElementById('toggle-settings').addEventListener('click', this.toggle.bind(this));

	addEventToArray(
		document.querySelectorAll('#settings-menu li a'),
		'click',
		this.closeMenu.bind(this)
		);

}


settings.prototype.closeMenu = function() {

	this.currentStatus = 'CLOSE';
	document.getElementById('settings-menu').className = '';

};


settings.prototype.openMenu = function() {

	this.currentStatus = 'OPEN';
	document.getElementById('settings-menu').className = 'show-menu';

};


settings.prototype.toggle = function() {

	if (this.currentStatus == 'OPEN') {
		this.closeMenu();
	} else {
		this.openMenu();
	}

};

function Toast(text, time=Toast.SHORT) {

	const cont = document.getElementById('toast-container');
	const chil = document.createElement('div');
	chil.className = 'toast';
	chil.innerHTML = `<p>${text}</p>`;

	cont.appendChild(chil);

	setTimeout(()=>{
		chil.remove();
	}, time);

}

Toast.LONG	= 6000;
Toast.SHORT	= 3200;
var g, h, t, p, s, c;

var mq = {
	desktop: window.matchMedia("(min-width: 1200px)").matches
}

window.addEventListener('click', (e)=>{

	if (e.target.nodeName == 'A' || e.target.parentElement.nodeName == 'A') {
		if (e.target.getAttribute('href') == '#' || e.target.parentElement.getAttribute('href') == '#') {
			e.preventDefault();
		}
	}

});

!function init() {

	c = new config();
	s = new settings();
	p = new pages();
	h = new hexer();

}();
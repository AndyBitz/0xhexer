function Hexer() {

	this.init_u_area();
	this.saveFile();

}


Hexer.prototype.init_u_area = function() {
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


Hexer.prototype.fileHandler = function(file) {
	this.file = file;
	this.readFile();
};


Hexer.prototype.readFile = function() {
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


Hexer.prototype.createHexPage = function() {
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


Hexer.prototype.loadSection = function() {

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

		const row = document.querySelector('.hex-row')

		if (end_page && row)
			lastRow = `style="width: ${row.clientWidth}px;" `;

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


Hexer.prototype.generateAsciiRow = function(counter) {
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


Hexer.prototype.generateHexRow = function(counter) {
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

			value += Hexer.fillUpByte(this.buffer[c+j].toString(16));
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


Hexer.fillUpByte = (byte, size=2)=>{

	if (byte.length == size)
		return byte;

	let filler = '';

	for (let i=1; i < size; i++) {
		filler += '0';
	}
	
	return `${filler}${byte}`;

};


Hexer.prototype.nextSection = function() {
	this.currentSection++;
	if (this.currentSection > this.totalSections)
		this.currentSection = this.totalSections;

	this.loadSection();
};


Hexer.prototype.previousSection = function() {
	this.currentSection--;
	if (this.currentSection < 0)
		this.currentSection = 0;

	this.loadSection();
};


Hexer.prototype.init_workspace = function() {

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

		if (e.keyCode === 20 ||
			e.keyCode === 16 ||
			e.keyCode === 17 ||
			(e.keyCode === 67 && e.ctrlKey)) {
			return;
		}

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
					const detail = {'BufferIndex': cvf[i]['data-slice'], 'BufferValue': this.buffer[cvf[i]['data-slice']]};
					window.dispatchEvent(new CustomEvent('BufferChange', {'detail': detail}));
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
					const detail = {'BufferIndex': cvf[i]['data-slice'], 'BufferValue': this.buffer[cvf[i]['data-slice']]};
					window.dispatchEvent(new CustomEvent('BufferChange', {'detail': detail}));
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


Hexer.prototype.updateAsciiFieldFromBuffer = function(dataSlice) {

	// get the correct data-slice value
	let start_value = parseInt(dataSlice);
	const ds_arr = [];

	while (start_value%this.asciiFieldSize != 0) {
		if (start_value <= 0) break;
		start_value--;
	}
	ds_arr.push(start_value);
	for (let i=1; i < this.asciiFieldSize; i++) {
		ds_arr.push( parseInt(ds_arr[0]) + parseInt(i) );
	}
	// partner field
	const pf = document.querySelector(`input.ascii-field[data-slice="${ds_arr.toString()}"]`);

	let value_buffer = '';
	for (let i=0; i < this.asciiFieldSize; i++) {
		value_buffer += toAscii(this.buffer[ds_arr[i]]);
	}
	pf.value = value_buffer;

	// window.dispatchEvent(new CustomEvent('BufferChange', {'detail': {'BufferIndex': ds_arr[0]}}));
};


Hexer.prototype.updateHexFieldFromBuffer = function(dataSlice) {

	// get the correct data-slice value
	let start_value = parseInt(dataSlice);
	const ds_arr = [];

	while (start_value%this.cellSize != 0) {
		if (start_value <= 0) break;
		start_value--;
	}
	ds_arr.push(start_value);
	for (let i=1; i < this.cellSize; i++) {
		ds_arr.push( parseInt(ds_arr[0]) + parseInt(i) );
	}
	// partner field
	const pf = document.querySelector(`input.hex-field[data-slice="${ds_arr.toString()}"]`);

	let value_buffer = '';
	for (let i=0; i < this.cellSize; i++) {
		value_buffer += Hexer.fillUpByte(this.buffer[ds_arr[i]].toString(16));
	}
	pf.value = value_buffer;

	// window.dispatchEvent(new CustomEvent('BufferChange', {'detail': {'BufferIndex': ds_arr[0]}}));
};


Hexer.prototype.saveFile = function() {


	document.getElementById('savefile').addEventListener('click', (e)=>{

		if (this.buffer != undefined) {

			const b = new Blob([this.buffer.buffer], {"type": "application/octet-binary"});
			const u = URL.createObjectURL(b);
			document.getElementById('download-file').href = u;
			document.getElementById('download-file').download = this.file.name;
			document.getElementById('download-file').click();

		} else {
			Toast('You have to load a file in order to save it.', Toast.SHORT);
		}

	});

};
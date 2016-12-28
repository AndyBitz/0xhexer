function hexer() {

	this.init_u_area();
	this.saveFile();

}


hexer.prototype.init_u_area = function() {
	this.uarea = document.getElementById('uploader');
	this.uareaicon = document.querySelector('#uploader i');
	this.inputfield = document.getElementById('fileoc');

	/* Click handling
	 *
	 */
	this.uareaicon.addEventListener('click', (e)=>{
		this.inputfield.click();
	});

	this.inputfield.addEventListener('change', (e)=>{
		if (e.target.files.length > 1) {
			t.newToast('Only one file is allowed');
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
			t.newToast('Only one file is allowed');
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
	let fr = new FileReader();
	this.buffer;

	fr.onloadstart = (e)=>{
		document.getElementById('up-status').className = 'soft-blink';
		t.newToast('Reading file.', toastt.SHORT);
	};

	fr.onloadend = (e)=>{
		document.getElementById('up-status').className = 'done';
		t.newToast('File has been read.', toastt.SHORT);
		this.buffer = new Uint8Array(e.target.result);
		this.createHexPage();
	};

	fr.readAsArrayBuffer(this.file);
};


hexer.prototype.createHexPage = function() {
	this.hexPage = document.getElementById('hex-view');

	this.totalRows = this.file.size/8;					// define total rows
	this.totalSections = Math.floor(this.totalRows/128);	// define total Sections; one section has 128 rows

	this.currentSection = 0;	// init current Section

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

	this.loadSection();

	p.next();
};


hexer.prototype.loadSection = function() {

	if (this.currentSection < 0 || this.currentSection > this.totalSections)
		this.currentSection = 0;

	let output = '';
	let row_counter = 0 + (this.currentSection*128);
	let c = 0 + (this.currentSection*128*8);

	setDataOfArray(
		document.querySelectorAll('[data-sec-data="sec-cur"]'),
		'value',
		this.currentSection
		);

	// generate section
	for (let i=0; i < 128; i++) {

		output += `<div data-row-nr="${row_counter++}">`; // start row
		let hex_row = '';
		let ascii_row = '';

		// generate both rows
		for (let j=0; j < 8; j++) {

			if (this.buffer[c] == undefined)
				break;

			hex_row		+= `<input maxlength="2" class="hex-field" data-slice="${c}" value="${this.buffer[c].toString(16)}">`;
			ascii_row	+= `<input maxlength="1" class="ascii-field" data-slice="${c}" value="${toAscii(this.buffer[c])}">`;

			c++;
		}

		output += `<div class="hex-row">${hex_row}</div><div class="ascii-row">${ascii_row}</div>`;

		output += `</div>`;	// end row

	}

	this.hexPage.innerHTML = output;
	this.init_workspace();
};


hexer.prototype.toTop = function() {
	this.hexPage.parentElement.scrollTop = 0;
};


hexer.prototype.toBottom = function() {
	this.hexPage.parentElement.scrollTop = this.hexPage.parentElement.scrollHeight;
};


hexer.prototype.nextSection = function() {
	this.currentSection++;
	if (this.currentSection > this.totalSections)
		this.currentSection = this.totalSection;

	this.loadSection();
};


hexer.prototype.previousSection = function() {
	this.currentSection--;
	if (this.currentSection < 0)
		this.currentSection = 0;

	this.loadSection();
};


hexer.prototype.init_workspace = function() {

	let cHandler = (e)=>{

		if (e.target.nodeName != 'INPUT')
			return;

		let rm = document.querySelectorAll('.active');

		for (let i=0; i < rm.length; i++) {
			rm[i].className = rm[i].className.replace(/ active||active/g, '');
		}

		e.target.className += ' active';
		e.target.select();

		if ( e.target.className.match(/hex-field/g) ) {
			
			let ds = e.target.getAttribute('data-slice');	// data-slice
			let pf = document.querySelector(`input.ascii-field[data-slice="${ds}"]`);	// partner field
			pf.className += ' active';

		} else if ( e.target.className.match(/ascii-field/g) ) {

			let ds = e.target.getAttribute('data-slice');	// data-slice
			let pf = document.querySelector(`input.hex-field[data-slice="${ds}"]`);	// partner field
			pf.className += ' active';

		}

	};


	let kHandler = (e)=>{

		if (e.target.nodeName != 'INPUT')
			return;

		let rm = document.querySelectorAll('.active');
		let ds = e.target.getAttribute('data-slice');	// data-slice

		if ( e.target.className.match(/hex-field/g) ) {
			
			let pf = document.querySelector(`input.ascii-field[data-slice="${ds}"]`);	// partner field
			pf.value = toAscii(parseInt(e.target.value, 16));

		} else if ( e.target.className.match(/ascii-field/g) ) {

			let pf = document.querySelector(`input.hex-field[data-slice="${ds}"]`);	// partner field
			pf.value = e.target.value.charCodeAt(0).toString(16);

		}

		this.buffer[ds] = parseInt(document.querySelector(`input.hex-field[data-slice="${ds}"]`).value, 16);

	};


	document.getElementById('hex-view').addEventListener('keyup', kHandler);
	document.getElementById('hex-view').addEventListener('click', cHandler);

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
			t.newToast('You have to load a file in order to save it.', toastt.SHORT);
		}

	});

};
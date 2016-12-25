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
	this.totalSections = Math.ceil(this.totalRows/128);	// define total Sections; one section has 128 rows

	this.currentSection = 0;	// init current Section

	document.getElementById('totalSec').textContent = this.totalSections;
	document.getElementById('curSec').min = 0;
	document.getElementById('curSec').max = this.totalSections;

	document.getElementById('skipToSection').addEventListener('click', (e)=>{
		this.currentSection = document.getElementById('curSec').value;
		this.loadSection();
	});

	this.loadSection();

	p.next();
};


hexer.prototype.loadSection = function() {

	let output = '';
	let row_counter = 0 + (this.currentSection*128);
	let c = 0 + (this.currentSection*128*8);

	document.getElementById('curSec').value = this.currentSection.toString();

	if (this.currentSection > 0)
		output += `<div class="section-button"><a href="#" onclick="h.previousSection();">Previous Section</a><a class="top-button" href="#" onclick="h.toBottom()"><i class="material-icons">keyboard_arrow_down</i></a></div>`;

	// generate section
	for (let i=0; i < 128; i++) {

		output += `<div data-row-nr="${row_counter++}">`; // start row
		let hex_row = '';
		let ascii_row = '';

		// generate both rows
		for (let j=0; j < 8; j++) {

			if (this.buffer.slice(c, c+1).length < 1)
				break;

			hex_row		+= `<input maxlength="2" class="hex-field" data-slice="${c}" value="${this.buffer[c].toString(16)}">`;
			ascii_row	+= `<input maxlength="1" class="ascii-field" data-slice="${c}" value="${toAscii(this.buffer[c])}">`;

			c++;
		}

		output += `<div class="hex-row">${hex_row}</div><div class="ascii-row">${ascii_row}</div>`;

		output += `</div>`; // end row

	}

	if (this.currentSection < this.totalSections)
		output += `<div class="section-button"><a href="#" onclick="h.nextSection();">Next Section</a><a class="top-button" href="#" onclick="h.toTop()"><i class="material-icons">keyboard_arrow_up</i></a></div>`;

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

	let fHandler = (e)=>{

		if (e.target.nodeName != 'INPUT')
			return;

		let rm = document.querySelectorAll('.active');

		for (let i=0; i < rm.length; i++) {
			rm[i].className = rm[i].className.replace(/ active||active/g, '');
		}

		e.target.className += ' active';

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
	document.getElementById('hex-view').addEventListener('click', fHandler);

};


hexer.prototype.saveFile = function() {


	document.getElementById('savefile').addEventListener('click', (e)=>{

		if (this.buffer !== undefined) {

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
			return '"';

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
function pages() {
	this.all = document.querySelectorAll('.pages .page');
	this.currentPage = 0;
	this.previousPage = this.currentPage;

	for (var i=0; i < this.all.length; i++) {
		this.all[i].setAttribute('data-page-index', i);
		this.all[i].style.display = 'none';
	}

	this.all[this.currentPage].style.display = 'block';
	this.initBackButtons();
}


pages.prototype.initBackButtons = function() {

	let backbtns = document.getElementsByClassName('back-btn');
	for (let i=0; i < backbtns.length; i++) {
		backbtns[i].addEventListener('click', (e)=>{
			this.goBack();
		});
	}

};


pages.prototype.next = function() {

	this.previousPage = this.currentPage;
	this.currentPage++;

	this.loadPage();

};


pages.prototype.previous = function() {

	this.previousPage = this.currentPage;
	this.currentPage--;

	this.loadPage();
};


pages.prototype.loadById = function(val) {

	this.previousPage = this.currentPage;
	this.currentPage = val;

	this.loadPage();
};


pages.prototype.goBack = function() {

	if (this.currentPage == this.previousPage)
		this.currentPage = 0;
	else
		this.currentPage = this.previousPage;
	this.loadPage();

};


pages.prototype.loadPage = function() {

	for (let i=0; i < this.all.length; i++) {
		this.all[i].style.display = 'none';
	}
	
	if (this.currentPage < 0)
		this.currentPage = 0;
	else if (this.currentPage > this.all.length-1)
		this.currentPage = this.all.length-1;

	this.all[this.currentPage].style.display = 'block';

};
function settings() {
	this.currentStatus = 'CLOSE';
	document.getElementById('toggle-settings').addEventListener('click', this.toggle);
	document.getElementById('howto').addEventListener('click', this.howto);

	// let back = document.getElementsByClassName('back-btn');

	// for (let i=0; i < back.length; i++) {
	// 	back[i].addEventListener('click', p.goBack);
	// }
}


settings.prototype.toggle = function() {

	if (this.currentStatus == 'OPEN') {
		this.currentStatus = 'CLOSE';
		document.getElementById('settings-menu').className = '';
	} else {
		this.currentStatus = 'OPEN';
		document.getElementById('settings-menu').className = 'show-menu';
	}

};


settings.prototype.howto = function() {

	p.loadById(2);
	document.getElementById('toggle-settings').click();

};
var toastt = {
	LONG: 6000,
	SHORT: 3200
};

function toast() {

	this.toast = document.getElementById('toast');
	this.next = [];
	this.active = false;
}

toast.prototype.newToast = function(text, length) {

	if (!this.active) {
		this.active = true;

		document.getElementById('toast-text').innerHTML = text;
		this.toast.className = 'show';

		this.timer = setTimeout( ()=>{
			this.toast.className += ' hide';
			setTimeout( ()=>{
				this.toast.className = '';
				this.toastText = '';
				this.active = false;
			}, 250 );

		}, length);

	} else {
		document.getElementById('toast-text').innerHTML += '<br>' + text;
	}

};
var g, h, t, p, s;

!function init() {

	s = new settings();
	p = new pages();
	t = new toast();
	h = new hexer();

}();
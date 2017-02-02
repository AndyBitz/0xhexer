function Settings() {

	this.currentStatus = 'CLOSE';
	document.getElementById('toggle-settings').addEventListener('click', this.toggle.bind(this));

	addEventToArray(
		document.querySelectorAll('#settings-menu li a'),
		'click',
		this.closeMenu.bind(this)
		);

	window.addEventListener('click', (e)=>{

		if (this.lastChange+10 < new Date().getTime()) {
			if (this.currentStatus == Settings.OPEN) {
				this.closeMenu();
			}
		}

	});

}

/* STATIC */
Settings.OPEN	= 'OPEN';
Settings.CLOSE	= 'CLOSE';
Settings.TIMER	= 10;


Settings.prototype.closeMenu = function() {

	document.getElementById('settings-menu').className = '';
	this.changeStatus();

};


Settings.prototype.openMenu = function() {

	document.getElementById('settings-menu').className = 'show-menu';
	this.changeStatus();
	

};


Settings.prototype.changeStatus = function() {
	this.currentStatus = (this.currentStatus === Settings.OPEN) ? Settings.CLOSE : Settings.OPEN;
	this.lastChange = new Date().getTime();
};


Settings.prototype.toggle = function() {

	if (this.currentStatus === Settings.OPEN) {
		this.closeMenu();
	} else {
		this.openMenu();
	}

};
function Settings() {

	this.currentStatus = 'CLOSE';
	document.getElementById('toggle-settings').addEventListener('click', this.toggle.bind(this));

	addEventToArray(
		document.querySelectorAll('#settings-menu li a'),
		'click',
		this.closeMenu.bind(this)
		);

}


Settings.prototype.closeMenu = function() {

	this.currentStatus = 'CLOSE';
	document.getElementById('settings-menu').className = '';

};


Settings.prototype.openMenu = function() {

	this.currentStatus = 'OPEN';
	document.getElementById('settings-menu').className = 'show-menu';

};


Settings.prototype.toggle = function() {

	if (this.currentStatus == 'OPEN') {
		this.closeMenu();
	} else {
		this.openMenu();
	}

};
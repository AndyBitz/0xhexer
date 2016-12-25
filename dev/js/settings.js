function settings() {
	this.currentStatus = 'CLOSE';
	document.getElementById('toggle-settings').addEventListener('click', this.toggle);
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
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
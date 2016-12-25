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
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
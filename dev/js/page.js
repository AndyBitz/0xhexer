function pages() {
	this.all = document.querySelectorAll('.pages .page');
	this.currentPage = 0;

	for (var i=0; i < this.all.length; i++) {
		this.all[i].setAttribute('data-page-index', i);
		this.all[i].style.display = 'none';
	}

	this.all[this.currentPage].style.display = 'block';
}

pages.prototype.next = function() {

	this.all[this.currentPage].style.display = 'none';
	this.currentPage++;

	if (this.currentPage > this.all.length-1)
		this.currentPage = this.all.length-1;

	this.all[this.currentPage].style.display = 'block';

};


pages.prototype.previous = function() {

	this.all[this.currentPage].style.display = 'none';
	this.currentPage--;

	if (this.currentPage < 0)
		this.currentPage = 0;

	this.all[this.currentPage].style.display = 'block';

};
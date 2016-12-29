function pages() {

	this.pages = document.querySelectorAll('.pages .page[data-page-id]');
	this.defaultPage = this.pages[0].getAttribute('data-page-id');
	this.currentPage = this.defaultPage;
	this.previousPage = this.currentPage;
	this.loadPage();
	this.initBackButtons();
	this.initURLs();

}


pages.prototype.initURLs = function() {

	let elem = document.querySelectorAll('[data-page-url]');
	for (let i=0; i < elem.length; i++) {

		let pageId = elem[i].getAttribute('data-page-url');

		elem[i].addEventListener('click', (e)=>{
			this.previousPage = this.currentPage;
			this.currentPage = pageId;
			this.loadPage();
		});
	}

};


pages.prototype.initBackButtons = function() {

	addEventToArray(
		document.getElementsByClassName('back-btn'),
		'click',
		this.goBack.bind(this)
		);

};


pages.prototype.goBack = function() {

	if (this.currentPage == this.previousPage)
		this.currentPage = this.defaultPage;
	else
		this.currentPage = this.previousPage;

	this.loadPage();

};


pages.prototype.loadPageById = function(sp) {

	let p = document.querySelector(`[data-page-id="${sp}"]`);
	if (p == undefined) {
		console.error("Pages does not exist!");
	} else {
		this.previousPage = this.currentPage;
		this.currentPage = sp;
		this.loadPage();
	}

};


pages.prototype.loadPage = function() {
	this.hideAllPages();
	this.showCurrentPage();
};


	/* showCurrentPage() and hideAllPages()
 	 * should only be called by loadPage()
 	 */
	pages.prototype.showCurrentPage = function() {
		document
			.querySelector(`[data-page-id="${this.currentPage}"]`)
			.style.display = 'block';
	};


	pages.prototype.hideAllPages = function() {
		for (var i=0; i < this.pages.length; i++) {
			this.pages[i].style.display = 'none';
		}
	};
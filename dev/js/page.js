function pages() {

	// variables
	this.pages			= document.querySelectorAll('.pages .page[data-page-id]');
	this.defaultPage	= this.pages[0].getAttribute('data-page-id');
	this.currentPage	= this.defaultPage;

	this.previousPage	= [];

	// inits
	this.initBackButtons();
	this.initURLs();

	// 
	if (window.location.pathname != '/') {
		this.loadPageById(window.location.pathname.replace('/', ''));
	} else {
		this.loadPageById(this.defaultPage);
	}

	// events
	window.addEventListener('popstate', (e)=>{
		e.preventDefault();
		this.loadPreviousPage(this.previousPage.pop() || this.defaultPage);
	});

}


pages.prototype.initURLs = function() {

	let elem = document.querySelectorAll('[data-page-url]');
	for (let i=0; i < elem.length; i++) {

		let pageId = elem[i].getAttribute('data-page-url');

		elem[i].addEventListener('click', (e)=>{
			this.loadPageById(pageId);
		});
	}

};


pages.prototype.initBackButtons = function() {
	addEventToArray(
		document.getElementsByClassName('back-btn'),
		'click',
		(e)=>{history.back();}
		);
};


pages.prototype.loadPreviousPage = function(sp) {
	let p = document.querySelector(`[data-page-id="${sp}"]`);
	if (p == undefined) {
		console.error("Back: Page does not exist!");
		Toast('Back: Page does not exist!', Toast.SHORT);
	} else {
		this.currentPage = sp;

		history.replaceState(null, '', sp);

		this.hideAllPages();
		this.showCurrentPage();
	}

};


pages.prototype.loadPageById = function(sp) {
	let p = document.querySelector(`[data-page-id="${sp}"]`);
	if (p == undefined) {
		console.error("Page does not exist!");
		Toast('Page does not exist!', Toast.SHORT);
	} else {
		this.previousPage.push(this.currentPage);
		this.currentPage = sp;
		this.loadPage();
	}

};


pages.prototype.loadPage = function() {

	// don't load /hex-view if no file is loaded
	if (this.currentPage == 'hex-view') {
		if (h == undefined || h.buffer == undefined) {
			this.currentPage = 'load';
		}
	}

	history.pushState(null, '', this.currentPage);
	this.hideAllPages();
	this.showCurrentPage();
};


	pages.prototype.hideAllPages = function() {
		for (var i=0; i < this.pages.length; i++) {
			this.pages[i].style.display = 'none';
		}
	};


	pages.prototype.showCurrentPage = function() {
		document
			.querySelector(`[data-page-id="${this.currentPage}"]`)
			.style.display = 'block';
	};
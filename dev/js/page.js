function Pages() {

	// variables
	this.pages			= document.querySelectorAll('.pages .page[data-page-id]');
	this.defaultPage	= Pages.LOAD;
	this.currentPage	= this.defaultPage;

	// inits
	this.initBackButtons();
	this.initURLs();

	// load new page
	if (window.location.pathname != '/') {
		this.loadPageById(window.location.pathname.replace('/', ''));
	} else {
		this.loadPageById(this.defaultPage, false);
	}

	// events
	window.addEventListener('popstate', (e)=>{
		if (e.state)
			this.loadPageById(e.state.id, false);
	});

}

/* STATIC */
// Page ids
Pages.LOAD		= 'load';
Pages.HEXVIEW	= 'hex-view';
Pages.CONFIG	= 'config';
Pages.HOWTO		= 'how-to';


Pages.prototype.initURLs = function() {

	const elem = document.querySelectorAll('[data-page-url]');

	for (let i=0; i < elem.length; i++) {

		let pageId = elem[i].getAttribute('data-page-url');

		elem[i].addEventListener('click', (e)=>{
			this.loadPageById(pageId);
		});
	}

};


Pages.prototype.initBackButtons = function() {
	addEventToArray(
		document.getElementsByClassName('back-btn'),
		'click',
		(e)=>{history.back();}
		);
};


Pages.prototype.loadPageById = function(sp, addHistoryState=true) {

	const p = document.querySelector(`[data-page-id="${sp}"]`);

	if (p == undefined) {

		Toast('Page does not exist!', Toast.SHORT);
		Toast(`Redirect to /${Pages.LOAD}.`, Toast.SHORT);

		this.loadPageById(Pages.LOAD);

	} else {
		this.currentPage = sp;
	}

	/* CHANGE HISTORY STATE */
	if (addHistoryState)
		history.pushState({'id': sp}, '', this.currentPage);
	else
		history.replaceState({'id': sp}, '', this.currentPage);

	/* EXCEPTIONS */
	// don't load /hex-view if no file is loaded
	if (this.currentPage == Pages.HEXVIEW) {
		if (h == undefined || h.buffer == undefined) {
			Toast(`Can\'t load /${Pages.HEXVIEW}. No File loaded.`);
			this.loadPageById(Pages.LOAD);
		}
	}

	this.showCurrentPage();

};


Pages.prototype.showCurrentPage = function() {

	for (var i=0; i < this.pages.length; i++) {
		this.pages[i].style.display = 'none';
	}

	try {
		document
			.querySelector(`[data-page-id="${this.currentPage}"]`)
			.style.display = 'block';
	} catch (e) {
		Toast('Pages does not exist.');
	}

};
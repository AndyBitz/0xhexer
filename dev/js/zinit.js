var g, h, t, p, s, c;

var mq = {
	desktop: window.matchMedia("(min-width: 1200px)").matches
}

window.addEventListener('click', (e)=>{

	if (e.target.nodeName == 'A' || e.target.parentElement.nodeName == 'A') {
		if (e.target.getAttribute('href') == '#' || e.target.parentElement.getAttribute('href') == '#') {
			e.preventDefault();
		}
	}

});

!function init() {

	c = new config();
	s = new settings();
	p = new pages();
	t = new toast();
	h = new hexer();

}();
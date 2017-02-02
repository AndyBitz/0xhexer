function HistoryHandler() {
	this.undoArray = [];
	this.redoArray = [];

	this.arrayLength = 1000;

	this.init();

}

/* Gets back one step in history.
 * Basically Undo.
 */
HistoryHandler.prototype.goBack = function () {
	if (h.buffer) {
		const last = this.undoArray.pop();
		this.redoArray.push(last);
		h.buffer[last.index] = last.value;
		h.updateAsciiFieldFromBuffer(last.index);
		h.updateHexFieldFromBuffer(last.index);

		// delete objects from redoArray if there are more than 1000 entries
		if (this.redoArray.length >= this.arrayLength) {
			const start = this.redoArray.length-this.arrayLength;
			const end 	= this.redoArray.length;
			this.redoArray = this.redoArray.slice(start, end);
		}

	}
};


/* Undo undo, so Redo.
 *
 */
HistoryHandler.prototype.goForward = function () {
	if (h.buffer) {
		const next = this.redoArray.pop();
		this.redoArray.push(next);
		h.buffer[next.index] = next.value;
		h.updateAsciiFieldFromBuffer(next.index);
		h.updateHexFieldFromBuffer(next.index);
	}
};


/* Init EventListeners.
 *
 */
HistoryHandler.prototype.init = function () {

	window.addEventListener('keyup', (e)=>{
		if (e.keyCode === 90 && e.ctrlKey) {
			this.goBack();
		}
	});

	window.addEventListener('keyup', (e)=>{
		if (e.keyCode === 89 && e.ctrlKey) {
			this.goForward();
		}
	});

	addEventToArray(
		document.querySelectorAll('[data-action="undo"]'),
		'click',
		(e)=>{
			this.goBack();
		});

	addEventToArray(
		document.querySelectorAll('[data-action="redo"]'),
		'click',
		(e)=>{
			this.goForward();
		});

	window.addEventListener('BufferChange', (e)=>{
		const stateObj = {
			'index': e.detail.BufferIndex,
			'value': e.detail.BufferValue
		};

		this.undoArray.push(stateObj);

		// delete objects from undoArray if there are more than 1000 entries
		if (this.undoArray.length >= this.arrayLength) {
			const start = this.undoArray.length-this.arrayLength;
			const end 	= this.undoArray.length;
			this.undoArray = this.undoArray.slice(start, end);
		}
	});

};
let customEvents = {
	open: new Event('open'),
	close: new Event('close'),
}

// this - DOM Element
// event - String
HTMLElement.prototype.trigger = function(event) {
	this.dispatchEvent(customEvents[event])
}

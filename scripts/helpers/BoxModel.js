export const getHeight = (element) => {
	let height = element.scrollHeight + 'px';
	return height;
}

export const isElementReached = (el, offsetY) {
	var top = el.offsetTop;
	var height = el.offsetHeight;
	var bottom = top + height;
	var offsetY = offsetY || 0;

	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	}

	var pointY = window.pageYOffset + offsetY;

	return top < pointY && bottom > pointY;
}

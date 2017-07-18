'use strict';
const stripAnsi = require('strip-ansi');
const isFullwidthCodePoint = require('is-fullwidth-code-point');

module.exports = str => {
	if (typeof str !== 'string' || str.length === 0) {
		return 0;
	}

	let width = 0;

	str = stripAnsi(str);

	for (let i = 0; i < str.length; i++) {
		const code = str.codePointAt(i);

		// Ignore control characters & combining characters
		if (code <= 0x1F || (code >= 0x7F && code <= 0x9F) || (code >= 0x300 && code <= 0x36F)) {
			continue;
		}

		// Surrogates
		if (code > 0xFFFF) {
			i++;
		}

		if (isFullwidthCodePoint(code)) {
			width += 2;
		} else {
			width++;
		}
	}

	return width;
};

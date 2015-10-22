/*eslint strict:0*/
'use strict';

// Gets branding for an article.
// Branding can either be an article brand or a columnist
module.exports = function(metadata) {
	if (!metadata) {
		return;
	}
	let brandingToUse = {};
	let columnists = [];

	if (metadata.tags) {
		columnists = metadata.tags.map(function(tag) {
			const attrs = tag.term.attributes;
			return (attrs && attrs.length && attrs[0].key === 'isColumnist' && attrs[0].value === true) ? tag : null;
		})
		.filter(function(e) { return e; }); // Clean out falsy vals from the array
	}

	if (metadata.brand && metadata.brand[0]) {
		brandingToUse = metadata.brand[0];
	}

	// Columnists trump brands
	if (columnists.length) {
		brandingToUse = columnists[0];
	}

	return brandingToUse.term || null;
};

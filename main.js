'use strict';

module.exports = function(metadata) {
	if (!metadata) {
		return;
	}
	var brandingToUse = {};

	//TODO: check for columnist when this data exists
	if (metadata.brand && metadata.brand[0]) {
		brandingToUse = metadata.brand[0];
	}

	return brandingToUse.term || null;
};

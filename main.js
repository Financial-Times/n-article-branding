/*eslint strict:0*/
'use strict';

const HEADSHOT_PREFIX = 'https://www.ft.com/__origami/service/image/v2/images/raw/';

function isABrand (metadata) {
	return metadata.find(tag => tag.taxonomy === 'brand');
}

// COMPLEX: This will only return an author if there is one author, for articles with
// more than one author don't pick one randomly because it might upset the other(s).
function isAnAuthor (metadata) {
	const authors = metadata.filter(tag => tag.taxonomy === 'authors');
	if (authors.length === 1) {
		return authors[0];
	}
}

function isGenreComment (metadata) {
	return metadata.find(tag =>
		tag.taxonomy === 'genre' &&
		tag.prefLabel === 'Comment'
	);
}

function getHeadshotFileName (tag) {
	const headshot = tag.attributes && tag.attributes.find(attr => attr.key === 'headshot');
	return headshot && headshot.value;
}

module.exports = function (metadata) {
	let matchedTag = isABrand(metadata);
	if (
		!matchedTag &&
		isAnAuthor(metadata) &&
		isGenreComment(metadata)
	) {
		matchedTag = isAnAuthor(metadata);
		const headshotFileName = getHeadshotFileName(matchedTag);
		if (headshotFileName) {
			matchedTag.headshot = HEADSHOT_PREFIX + headshotFileName;
		}
	}
	return matchedTag || null;
};

/*eslint strict:0*/
'use strict';

const removeDiacritics = require('diacritics').remove;
const checkForHeadshotAttribute = require('./mappings/headshot-mapping');

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

function headshotUrl (tag) {
	const fileName = removeDiacritics(tag.prefLabel).toLowerCase().replace(/(\s|')+/g,'-');
	return `https://www.ft.com/__origami/service/image/v2/images/raw/fthead:${fileName}`;
}

module.exports = function (metadata) {
	let matchedTag = isABrand(metadata);
	if (
		!matchedTag &&
		isAnAuthor(metadata) &&
		isGenreComment(metadata)
	) {
		matchedTag = isAnAuthor(metadata);
		checkForHeadshotAttribute(matchedTag);
	}
	if (matchedTag &&
			matchedTag.taxonomy === 'authors' &&
			matchedTag.attributes &&
			matchedTag.attributes.find(attribute => attribute.key === 'hasHeadshot')
	) {
		matchedTag.headshot = headshotUrl(matchedTag);
	}
	return matchedTag || null;
};

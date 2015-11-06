/*eslint strict:0*/
'use strict';

const checkForHeadshotAttribute = require('./mappings/headshot-mapping');

function isABrand(metadata) {
	return metadata.find(tag => tag.taxonomy === 'brand');
}

function isAnAuthor(metadata) {
	return metadata.find(tag => tag.taxonomy === 'authors');
}

function isGenreComment(metadata) {
	return metadata.find(tag =>
		tag.taxonomy === 'genre' &&
		tag.prefLabel === 'Comment'
	);
}

function headshotUrl(tag) {
	return `https://image.webservices.ft.com/v1/images/raw/fthead:${tag.prefLabel.toLowerCase().replace(' ', '-')}`;
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

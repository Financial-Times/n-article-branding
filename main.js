/*eslint strict:0*/
'use strict';

const removeDiacritics = require('diacritics').remove;
const checkForHeadshotAttribute = require('./mappings/headshot-mapping');

function getBrandTag(metadata) {
	return metadata.find(tag => tag.primary === 'brand');
}

function headshotUrl(tag) {
	const fileName = removeDiacritics(tag.prefLabel).toLowerCase().replace(/(\s|')+/g,'-');
	return `https://next-geebee.ft.com/image/v1/images/raw/fthead:${fileName}`;
}

module.exports = function (metadata) {
	let brandTag = getBrandTag(metadata);
	if (brandTag && brandTag.taxonomy === 'authors') {
		checkForHeadshotAttribute(brandTag);
		if (brandTag.attributes
				&& brandTag.attributes.find(attribute => attribute.key === 'hasHeadshot')
		) {
			brandTag.headshot = headshotUrl(brandTag);
		}
	}
	return brandTag || null;
};

/*eslint strict:0*/
'use strict';

const HEADSHOT_PREFIX = 'https://www.ft.com/__origami/service/image/v2/images/raw/';

function isABrand (annotations) {
	return annotations.find(annotation => annotation.types && annotation.types.includes('http://www.ft.com/ontology/product/Brand'));
}

// COMPLEX: This will only return an author if there is one author, for articles with
// more than one author don't pick one randomly because it might upset the other(s).
function isAnAuthor (annotations) {
	const authors = annotations.filter(annotation => annotation.predicate === 'http://www.ft.com/ontology/annotation/hasAuthor');
	if (authors.length === 1) {
		return authors[0];
	}
}

function isGenreComment (annotations) {
	return annotations.find(annotation =>
		annotation.types && annotation.types.includes('http://www.ft.com/ontology/Genre') &&
		annotation.prefLabel === 'Comment'
	);
}

function getHeadshotFileName (tag) {
	const headshot = tag.attributes && tag.attributes.find(attr => attr.key === 'headshot');
	return headshot && headshot.value;
}

module.exports = function (annotations) {
	let matchedTag = isABrand(annotations);
	if (
		!matchedTag &&
		isAnAuthor(annotations) &&
		isGenreComment(annotations)
	) {
		matchedTag = isAnAuthor(annotations);
		const headshotFileName = getHeadshotFileName(matchedTag);
		if (headshotFileName) {
			matchedTag.headshot = HEADSHOT_PREFIX + headshotFileName;
		}
	}
	return matchedTag || null;
};

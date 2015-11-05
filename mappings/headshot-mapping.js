const data = require('../data/headshot-mapping-data');

module.exports = function (tag) {

	if (!tag || !tag.taxonomy || tag.taxonomy !== 'authors') {
		return;
	}

	const matchedTag = data.authors.find(author => author.id === tag.idV1);

	if (matchedTag) {
		tag.attributes = tag.attributes.concat(matchedTag.attributes);
	}

	return;
};

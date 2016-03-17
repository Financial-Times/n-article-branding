/*global describe, it*/

require('chai').should();
const expect = require('chai').expect;

const headshotMapping = require('../../mappings/headshot-mapping');

const headshotAuthorTag = {
	idV1: "Q0ItMDAxNzEwNg==-QXV0aG9ycw==",
	name: "Janan Ganesh",
	taxonomy: "authors",
	attributes: [ ]
};

const noHeadshotAuthorTag = {
	idV1: 'Q0ItSlA4OTc2NQ==-QXV0aG9ycw==',
  name: 'Jeremy Paxman',
	attributes: [],
	taxonomy: 'authors'
};

const notAuthorTag = {
  idV1: "OA==-R2VucmVz",
	name: "Comment",
	taxonomy: "genre",
	attributes: [ ]
};

describe('Mapping author to headshot', function () {

	it('should add attribute of key hasHeadshot with value true for listed authors', function () {
		headshotMapping(headshotAuthorTag);
    headshotAuthorTag.attributes[0].should.eql({key: "hasHeadshot", value: true});
	});

	it('should not amend an author tag with no headshot', function () {
		headshotMapping(noHeadshotAuthorTag);
    noHeadshotAuthorTag.attributes.should.be.empty;
	});

	it('should not amend a tag which does not have taxonomy of author', function () {
		(headshotMapping(notAuthorTag));
    notAuthorTag.attributes.should.be.empty;
	});

	it('should be undefined when no tag is provided', function () {
		expect(headshotMapping()).to.be.undefined;
	});

});

/*global describe, it*/
'use strict';

var should = require('chai').should();
var getBranding = require('../main');

var fixtures = {
	hasBrand: {
		brand: [{
			term: {
				name: 'Lex',
			}
		}],
		tags: [{
			term: {
				name: 'Bobby Davro',
				taxonomy: 'people',
				attributes: []
			}
		}]
	},
	hasColumnist: {
		tags: [
			{
				term: {
					name: 'Bobby Davro',
					taxonomy: 'people',
					attributes: []
				}
			},
			{
				term: {
					name: 'Martin Wolf',
					taxonomy: 'people',
					attributes: [
						{
							value: true,
							key: 'isColumnist'
						}
					]
				}
			}
		]
	},
	hasBrandAndColumnist: {
		brand: [{
			term: {
				name: 'Lex',
			}
		}],
		tags: [
			{
				term: {
					name: 'Bobby Davro',
					taxonomy: 'people',
					attributes: []
				}
			},
			{
				term: {
					name: 'Martin Wolf',
					taxonomy: 'people',
					attributes: [
						{
							value: true,
							key: 'isColumnist'
						}
					]
				}
			}
		]
	},
	hasNoBrandOrColumnist: {},
	hasNoAttributes: {
		tags: [
			{
				term: {
					name: 'Bobby Davro',
					taxonomy: 'people'
				}
			}
		]
	}
};

describe('Branding', function () {
	it('should set branding to the article brand if present', function() {
		getBranding(fixtures.hasBrand).should.equal(fixtures.hasBrand.brand[0].term);
	});

	it('should set branding to the article columnist if present', function() {
		getBranding(fixtures.hasColumnist).should.equal(fixtures.hasColumnist.tags[1].term);
	});

	it('should set branding to the columnist if both brand and columnist are present', function() {
		getBranding(fixtures.hasBrandAndColumnist).should.equal(fixtures.hasBrandAndColumnist.tags[1].term);
	});

	it('should return null if no brand or columnist is present', function() {
		should.not.exist(getBranding(fixtures.hasNoBrandOrColumnist));
	});

	it('should return null if a tag has no attributes', function() {
		should.not.exist(getBranding(fixtures.hasNoAttributes));
	});
});

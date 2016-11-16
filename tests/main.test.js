/*global describe, it*/
/*eslint strict:0*/
'use strict';

const should = require('chai').should();
const getBranding = require('../main');

const brandMetadata = require('./fixtures/metadata/brandMetadata');
const brandAndColumnistMetadata = require('./fixtures/metadata/brandAndColumnistMetadata');
const twoColumnistsMetadata = require('./fixtures/metadata/twoColumnistsMetadata');
const columnistMetadata = require('./fixtures/metadata/columnistMetadata');
const columnistHasHeadshotMetadata = require('./fixtures/metadata/columnistHasHeadshotMetadata');
const defaultMetadata = require('./fixtures/metadata/defaultMetadata');

const brand = require('./fixtures/branding/brand');
const columnist = require('./fixtures/branding/columnist');
const columnistHeadshot = require('./fixtures/branding/columnistHeadshot');

describe('Branding', function () {
	it('should set branding to the article brand if present', function () {
		getBranding(brandMetadata).should.eql(brand);
	});

	it('should set branding to the article columnist if present', function () {
		getBranding(columnistMetadata).should.eql(columnist);
	});

	it('should set branding to the brand if both brand (not equal to author) and columnist are present', function () {
		getBranding(brandAndColumnistMetadata).should.eql(brand);
	});

	it('should set a headshot to the branding if a columnist and has hasHeadshot attribute', function () {
		getBranding(columnistHasHeadshotMetadata).should.eql(columnistHeadshot);
	});

	it('should return null if no brand or columnist is present', function () {
		should.not.exist(getBranding(defaultMetadata));
	});

	it('should return null if there is more than one author', () => {
		should.not.exist(getBranding(twoColumnistsMetadata))
	});

});

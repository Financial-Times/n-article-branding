/*global describe, it*/
/*eslint strict:0*/
'use strict';

const should = require('chai').should();
const getBranding = require('../main');

const brandMetadata = require('./fixtures/metadata/brandMetadata');
const columnistMetadata = require('./fixtures/metadata/columnistMetadata');
const columnistHasHeadshotMetadata = require('./fixtures/metadata/columnistHasHeadshotMetadata');
const defaultMetadata = require('./fixtures/metadata/defaultMetadata');

const brand = require('./fixtures/branding/brand');
const columnist = require('./fixtures/branding/columnist');
const columnistHeadshot = require('./fixtures/branding/columnistHeadshot');

describe('Branding', function () {
	it('should set branding to brand if it has primary brand present', function() {
		getBranding(brandMetadata).should.eql(brand);
	});

	it('should set branding to the author if it has primary brand present', function() {
		getBranding(columnistMetadata).should.eql(columnist);
	});

	it('should set a headshot to the branding if a columnist and has hasHeadshot attribute', function () {
		getBranding(columnistHasHeadshotMetadata).should.eql(columnistHeadshot);
	});

	it('should return null if no primary brand is present', function() {
		should.not.exist(getBranding(defaultMetadata));
	});

});

var expect = require('expect.js'),
	cache = require('../nodecache');

var testFunction = function () {
	return 'testValue';
};

describe('nodecache', function () {
	it('should save data in memory', function (done) {
		var data = cache.save('testData', testFunction);
		expect(data).to.be('testValue');
		expect(cache.get('testData')).to.be('testValue');
		done();
	});

	it('should persist data in redis', function (done) {
		cache.persist('moreData', testFunction, function (err, data) {
			expect(err).to.not.be.ok();
			expect(data).to.be('testValue');
			done();
		});
	});
});
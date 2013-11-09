var redis = require('redis');

var client;
var database = {};

var nodecache = {

	/**
	 * Save data in Memory
	 *
	 * @param key
	 * @param dataFunc
	 * @returns {*}
	 */
	save: function (key, dataFunc) {
		if (!database[key]) {
			database[key] = dataFunc();
		}
		return database[key];
	},

	/**
	 * Persist data
	 *
	 * @param key
	 * @param dataFunc
	 */
	persist: function (key, dataFunc, cb) {
		if (!client) {
			client = redis.createClient();
		}
		if (!database[key]) {
			client.get(key, function (err, reply) {
				if (err) {
					return cb(err);
				}
				if (!reply) {
					database[key] = dataFunc();
					client.set(key, database[key], function () {
						cb(null, database[key]);
					});
				}
			});
		}
		else {
			cb(null, database[key]);
		}
	},

	/**
	 * Get value from memory
	 *
	 * @param key
	 * @returns {*}
	 */
	get: function (key) {
		return database[key];
	},

	/**
	 * Save value in memory
	 *
	 * @param key
	 * @param value
	 */
	set: function (key, value) {
		database[key] = value;
	}
};

module.exports = nodecache;
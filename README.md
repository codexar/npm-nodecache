Simple and powerful Cache Module for NodeJS.
=============

Install with:

    npm install nodecache

## Usage

Save data in memory, the second parameter of `cache.save` only be called if it is not currently in memory.

```js
var cache = require('nodecache');

var myFunction = function () {
    ...
    return 'Some Data';
};
var myData = cache.save('myData', myFunction); // This will call myFunction() and return 'Some Data'.
var myCachedData = cache.save('myData', myFunction); // This will return 'Some Data' without call myFunction().
```

Persist data using Redis:

```js
var cache = require('nodecache');

var myFunction = function () {
    ...
    return 'Some Data';
};
cache.persist('myData', myFunction, function (err, reply) {
    console.log(reply); // Some Data
});
```

In the code above, data will be searched first in local memory, if not found there, it will be searched on Redis Storange, and if neither, it finally call myFunction().


## Api Reference

* cache.save(key, dataFunc)
* cache.persist(key, dataFunc, cb)
* cache.get(key)
* cache.set(key, value)
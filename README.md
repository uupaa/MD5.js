# MD5.js [![Build Status](https://travis-ci.org/uupaa/MD5.js.png)](http://travis-ci.org/uupaa/MD5.js)

[![npm](https://nodei.co/npm/uupaa.md5.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.md5.js/)

Calc MD5 hash.

## Document

- [MD5.js wiki](https://github.com/uupaa/MD5.js/wiki/MD5)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


## How to use

### Browser

```js
<script src="lib/MD5.js">
<script>
console.log( MD5("aaa") ); // 47bce5c74f589f4867dbd57e9ca9f808
</script>
```

### WebWorkers

```js
importScripts("lib/MD5.js");

console.log( MD5("aaa") ); // 47bce5c74f589f4867dbd57e9ca9f808
```

### Node.js

```js
var MD5 = require("lib/MD5.js");

console.log( MD5("aaa") ); // 47bce5c74f589f4867dbd57e9ca9f808
```

=========
MD5.js
=========

![](https://travis-ci.org/uupaa/MD5.js.png)

Calc MD5 hash.

# Document

- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [MD5.js wiki](https://github.com/uupaa/MD5.js/wiki/MD5)


# How to use

```js
<script src="lib/MD5.js">
<script>
// for Browser
console.log( MD5("aaa") ); // 47bce5c74f589f4867dbd57e9ca9f808
</script>
```

```js
// for WebWorkers
importScripts("lib/MD5.js");

console.log( MD5("aaa") ); // 47bce5c74f589f4867dbd57e9ca9f808
```

```js
// for Node.js
var MD5 = require("lib/MD5.js");

console.log( MD5("aaa") ); // 47bce5c74f589f4867dbd57e9ca9f808
```

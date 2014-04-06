MD5.js
=========

calc MD5 hash.

# Document

- https://github.com/uupaa/MD5.js/wiki/MD5

and

- https://github.com/uupaa/WebModule and [slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
- https://github.com/uupaa/Help.js and [slide](http://uupaa.github.io/Slide/slide/Help.js/index.html)

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

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/MD5.js.git
    $ cd MD5.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`



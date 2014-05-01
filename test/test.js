var ModuleTest = (function(global) {

return new Test({
        disable:    false,
        node:       true,
        browser:    true,
        worker:     true,
        button:     true,
        both:       true,
        primary:    global["MD5"],
        secondary:  global["MD5_"],
    }).add([
        testMD5String,
        testMD5Binary,
    ]).run().clone();

function testMD5String(next) {

    var source = "aaa";
    var answer = "47bce5c74f589f4867dbd57e9ca9f808";
    var md5HashString = MD5(source);

    if (answer === md5HashString) {
        console.log("testMD5String ok");
        next && next.pass();
    } else {
        console.log("testMD5String ng");
        next && next.miss();
    }
}

function testMD5Binary(next) {

    var source = "aaa";
    var answer = "47bce5c74f589f4867dbd57e9ca9f808";
    var md5HashArray = MD5.encode(ByteArray.fromString(source));

    var match = md5HashArray.every(function(value, index) {
            var hex = parseInt(answer.slice(index * 2, index * 2 + 2), 16);

            return value === hex;
        });

    if (match) {
        console.log("testMD5Binary ok");
        next && next.pass();
    } else {
        console.log("testMD5Binary ng");
        next && next.miss();
    }
}

})((this || 0).self || global);


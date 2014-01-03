// --- define ----------------------------------------------
// --- variable --------------------------------------------
var test = new UnitTest([
        testMD5String,
        testMD5Binary,
    ]);

// --- interface -------------------------------------------
// --- implement -------------------------------------------
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
    var md5HashArray = MD5.encode(WordArray.fromString(source));

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

// --- export ----------------------------------------------

// --- run ----------------------------------------------
function _init() {
    // create <input> buttons.
    if (typeof document !== "undefined") {
        test.names().forEach(function(name) {
            //  <input type="button" onclick="testX()" value="testX()" /> node.
            document.body.appendChild(
                _createNode("input", {
                    type: "button",
                    value: name + "()",
                    onclick: name + "()" }));
        });
        window.addEventListener("error", function(message, lineno, filename) {
            document.body.style.backgroundColor = "red";
        });
    }
    // run
    test.run(function(err) {
        if (typeof document !== "undefined") {
            document.body.style.backgroundColor = err ? "red" : "lime";
        } else {
            // console color
            var RED    = '\u001b[31m';
            var YELLOW = '\u001b[33m';
            var GREEN  = '\u001b[32m';
            var CLR    = '\u001b[0m';

            if (err) {
                console.log(RED + "error." + CLR);
            } else {
                console.log(GREEN + "ok." + CLR);
            }
        }
    });

    function _createNode(name, attrs) {
        var node = document.createElement(name);

        for (var key in attrs) {
            node.setAttribute(key, attrs[key]);
        }
        return node;
    }
}

if (this.self) {
    this.self.addEventListener("load", _init);
} else {
    _init();
}


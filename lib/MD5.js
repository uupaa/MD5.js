(function(global) {
"use strict";

// --- dependency module -----------------------------------
var DataType = global["DataType"] || require("uupaa.datatype.js");

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- define ----------------------------------------------
// pre-calculated value tables
var MD5_A = [
        0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf,
        0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af,
        0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e,
        0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
        0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6,
        0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
        0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122,
        0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
        0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039,
        0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97,
        0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d,
        0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
        0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391 ];
var MD5_S = [
        7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
        5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
        4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
        6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21 ];
var MD5_X = [
        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
        1,  6, 11,  0,  5, 10, 15,  4,  9, 14,  3,  8, 13,  2,  7, 12,
        5,  8, 11, 14,  1,  4,  7, 10, 13,  0,  3,  6,  9, 12, 15,  2,
        0,  7, 14,  5, 12,  3, 10,  1,  8, 15,  6, 13,  4, 11,  2,  9 ];

// --- interface -------------------------------------------
function MD5(source) { // @arg String - source string
                       // @ret MD5HashHexString
//{@dev
    $valid($type(source, "String"), MD5, "source");
//}@dev

    var md5 = DataType["Array"]["toHexStringArray"](
                    MD5_encode(
                        DataType["Uint8Array"]["fromString"](source)
                    ));

    return md5.join("");
}

MD5["repository"] = "https://github.com/uupaa/MD5.js";
MD5["encode"] = MD5_encode; // MD5.encode(source:ByteArray):ByteArray

// --- implement -------------------------------------------
function MD5_encode(source) { // @arg Uint8Array
                              // @ret Uint8Array
//{@dev
    $valid($type(source, "Uint8Array"), MD5_encode, "source");
//}@dev

    var buffer = _createBufferWith64BytePadding(source);
    var hash   = _MD5(buffer); // [a, b, c, d]
    var result = new Uint8Array(16);

    for (var ri = 0, hi = 0; hi < 4; ri += 4, ++hi) {
        result[ri    ] = hash[hi]        & 0xff;
        result[ri + 1] = hash[hi] >>>  8 & 0xff;
        result[ri + 2] = hash[hi] >>> 16 & 0xff;
        result[ri + 3] = hash[hi] >>> 24 & 0xff;
    }
    return result;
}

function _createBufferWith64BytePadding(source) {
    var iz     = source.length;
    var e      = iz * 8;
    var remain = (iz + 1) % 64;
    var times  = (iz + 1) >> 6;

    if (remain > 56) {
        ++times;
    }
    var bufferLength = (times + 1) << 6;
    var buffer = new Uint8Array(bufferLength);

    buffer.set(source);
    buffer[iz] = 0x80;
    buffer[bufferLength - 8] = e        & 0xff;
    buffer[bufferLength - 7] = e >>>  8 & 0xff;
    buffer[bufferLength - 6] = e >>> 16 & 0xff;
    buffer[bufferLength - 5] = e >>> 24 & 0xff;

    return buffer;
}

function _MD5(source) { // @arg Uint8Array
                        // @ret Array
                        // @desc calc MD5
    // setup default values
    var a = 0x67452301;
    var b = 0xefcdab89;
    var c = 0x98badcfe;
    var d = 0x10325476;

    // working and temporary
    var aa = 0, bb = 0, cc = 0, dd = 0;
    var ra = 0, rb = 0, rc = 0;
    var i = 0, iz = source.length, j = 0, k = 0, n = 0;
    var word = [];

    for (; i < iz; i += 64) {
        for (j = 0; j < 16; ++j) {
            k = i + j * 4;
            word[j] = source[k] + (source[k + 1] <<  8) +
                                  (source[k + 2] << 16) +
                                  (source[k + 3] << 24);
        }
        aa = a;
        bb = b;
        cc = c;
        dd = d;

        for (j = 0; j < 64; ++j) {
            n = j < 16 ? (b & c) | (~b & d) // ff - Round 1
              : j < 32 ? (b & d) | (c & ~d) // gg - Round 2
              : j < 48 ?  b ^ c ^ d         // hh - Round 3
                       :  c ^ (b | ~d);     // ii - Round 4
            n += a + word[MD5_X[j]] + MD5_A[j];

            ra = b + ((n << MD5_S[j]) | (n >>> (32 - MD5_S[j])));
            rb = b;
            rc = c;
            // --- rotate ---
            a = d;
            b = ra;
            c = rb;
            d = rc;
        }
        a += aa;
        b += bb;
        c += cc;
        d += dd;
    }
    return [a, b, c, d];
}

//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = MD5;
}
global["MD5" in global ? "MD5_" : "MD5"] = MD5; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom


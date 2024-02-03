"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xorCipher = exports.fixedXor = exports.convertHexText = exports.convertHexBinary = exports.convertHexBase64 = void 0;
init();
function init() {
    // //call convertBase with original hex string.
    console.log(convertHexBase64("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"));
    console.log(fixedXor("1c0111001f010100061a024b53535009181c", "686974207468652062756c6c277320657965"));
    displayPlaintext();
}
/**
 * Accepts a base 16 string and converts it to a base 64 string.
 * @param origin
 */
function convertHexBase64(origin) {
    let bufferObj = Buffer.from(origin, "hex");
    return bufferObj.toString("base64");
}
exports.convertHexBase64 = convertHexBase64;
/**
 * @param origin String input in hex
 * returns String output as the binary conversion
 */
function convertHexBinary(origin) {
    origin = "0x" + origin;
    return BigInt(origin).toString(2);
}
exports.convertHexBinary = convertHexBinary;
/**
 *
 * @param origin String input in hex
 * returns String output as the ASCII conversion
 */
function convertHexText(origin) {
    let ascii = "";
    for (let i = 0; i < origin.length; i += 2) {
        let hexChar = origin.substring(1, i + 2);
        var txtChar = String.fromCharCode(parseInt(hexChar, 16));
        ascii = ascii + txtChar;
    }
    return ascii;
}
exports.convertHexText = convertHexText;
/**
 *
 * @param string1
 * @param string2
 */
function fixedXor(string1, string2) {
    //decode initial hex string into binary.
    string1 = convertHexBinary(string1);
    string2 = convertHexBinary(string2);
    let int1 = BigInt("0b" + string1);
    let int2 = BigInt("0b" + string2);
    let result = int1 ^ int2;
    return result.toString(16);
}
exports.fixedXor = fixedXor;
//Challenge 3 uses "x".
function displayPlaintext() {
    //could be considered a testing function.
    //for i->n such as 5
    //display the results of xor'ing the string against a single char
    for (let i = 0; i < 10; i++) {
        console.log(convertHexText(xorCipher(String.fromCharCode('x'.charCodeAt(0) + i), "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736")));
    }
}
function xorCipher(char, ctext) {
    //expand the size of the char string to the size of the ctext string
    let chars = "";
    char = char.charCodeAt(0).toString(16);
    while (chars.length != ctext.length) {
        chars += char;
    }
    return fixedXor(ctext, chars);
    //call fixedxor on both
}
exports.xorCipher = xorCipher;
function decryptFile(ctext) {
    return "";
}
/**
 * @param ptext accepts supposed plaintext
 * determines how likely the plaintext is English.
 * Returns -1 if not English.
 */
function score(ptext) {
    return "";
}

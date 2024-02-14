"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptFile = exports.xorCipher = exports.fixedXor = exports.convertHexText = exports.convertHexBinary = exports.convertHexBase64 = void 0;
const fs = require('fs');
const readline = require('readline');
init();
function init() {
    console.log(convertHexBase64("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"));
    console.log(fixedXor("1c0111001f010100061a024b53535009181c", "686974207468652062756c6c277320657965"));
    decryptFile("test.txt");
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
        let hexChar = origin.substring(i, i + 2);
        var txtChar = String.fromCharCode(parseInt(hexChar, 16));
        if (hexChar === "00")
            txtChar = " ";
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
function xorCipher(char, ctext) {
    let chars = "";
    char = char.charCodeAt(0).toString(16);
    while (chars.length != ctext.length) {
        chars += char;
    }
    return fixedXor(ctext, chars);
    //call fixedxor on both
}
exports.xorCipher = xorCipher;
/**
 * Returns the results of xor with each letter
 * @param ctext Ciphertext to be entered
 */
function bruteXor(ctext) {
    let candidates = new Array(2);
    for (let i = 0; i < 26; i++) {
        let ptext = convertHexText(xorCipher(String.fromCharCode(97 + i), ctext));
        //Call scoring method here.
        if (score(ptext) >= 5) {
            candidates[0] = ptext;
        }
    }
    //Return a list of scored strings.
    return candidates;
}
function decryptFile(filename) {
    let results = new Array(2);
    //Create and read the file object.
    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });
    //For each line in the file
    file.on("line", (line) => {
        // //For each char in the alphabet
        // //Try each char
        // //Display the ascii equivalent of the text.
        // results = Array.from(bruteXor(line));
        let fline = line;
        console.log(fline);
        results[0] = line;
    });
    return results[0];
}
exports.decryptFile = decryptFile;
/**
 * @param ptext accepts supposed plaintext
 * determines how likely the plaintext is English.
 * Returns -1 if not English.
 */
function score(ptext) {
    let vowel = ptext.match(/[aeiou]/gi);
    // @ts-ignore
    let vScore = 3 * vowel.length;
    // @ts-ignore
    let cScore = ptext.length - vowel.length;
    return vScore + cScore;
}
/**
 * Encrypts each byte of plaintext with each byte of key, cycling back to the beginning of the key.
 */
function repeatKeyXor() {
}

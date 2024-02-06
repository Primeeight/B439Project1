"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xorCipher = exports.fixedXor = exports.convertHexText = exports.convertHexBinary = exports.convertHexBase64 = void 0;
//import fspromise for later use.
const fs = __importStar(require("fs/promises"));
init();
function init() {
    // //call convertBase with original hex string.
    console.log(convertHexBase64("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"));
    console.log(fixedXor("1c0111001f010100061a024b53535009181c", "686974207468652062756c6c277320657965"));
    console.log(convertHexText("00"));
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
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        //May only want to read the file.
        //Create a file object.
        //Read the file object
        const [file] = yield Promise.all([fs.open("./4.txt", "r")]);
        try {
            //For each line in the file
            for (var _d = true, _e = __asyncValues(file.readLines()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const line = _c;
                //For each char in the alphabet
                for (let i = 0; i < 26; i++) {
                    //Try each char
                    //Display the assci equivalent of the text.
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return "";
    });
}
/**
 * @param ptext accepts supposed plaintext
 * determines how likely the plaintext is English.
 * Returns -1 if not English.
 */
function score(ptext) {
    return "";
}
/**
 * Encrypts each byte of plaintext with each byte of key, cycling back to the beginning of the key.
 */
function repeatKeyXor() {
}

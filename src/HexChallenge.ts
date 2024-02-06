//import fspromise for later use.
import * as fs from "fs/promises";

init();
function init() {
// //call convertBase with original hex string.
console.log(convertHexBase64("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
));
console.log(fixedXor("1c0111001f010100061a024b53535009181c", "686974207468652062756c6c277320657965"))
    console.log(convertHexText("00"));
}

/**
 * Accepts a base 16 string and converts it to a base 64 string.
 * @param origin
 */
 function convertHexBase64(origin: string ){
    let bufferObj= Buffer.from(origin, "hex");
    return bufferObj.toString("base64");
}

/**
 * @param origin String input in hex
 * returns String output as the binary conversion
 */
function convertHexBinary(origin: string ) {
  origin = "0x" + origin;
    return BigInt(origin).toString(2);
}

/**
 *
 * @param origin String input in hex
 * returns String output as the ASCII conversion
 */
function convertHexText(origin: string){
    let ascii = "";
    for (let i = 0; i <origin.length; i+=2){
        let hexChar = origin.substring(i, i +2);
        var txtChar = String.fromCharCode(parseInt(hexChar, 16))
        if (hexChar === "00")
            txtChar = " ";
        ascii = ascii + txtChar;
    }
    return ascii;
}
/**
 *
 * @param string1
 * @param string2
 */
function fixedXor(string1: string, string2: string) {
    //decode initial hex string into binary.
    string1 = convertHexBinary(string1);
    string2 = convertHexBinary(string2);
    let int1 = BigInt("0b" +string1);
    let int2 = BigInt("0b" + string2);
    let result = int1 ^int2;
    return result.toString(16);
}

function xorCipher(char:string, ctext:string) {
//expand the size of the char string to the size of the ctext string
    let chars = "";
    char = char.charCodeAt(0).toString(16);
    while (chars.length!=ctext.length){
    chars += char;
    }
        return fixedXor(ctext, chars);
    //call fixedxor on both
}
async function decryptFile(ctext: string) {
    //May only want to read the file.
//Create a file object.
    //Read the file object
    const [file] = await Promise.all([fs.open("./4.txt", "r")]);
    //For each line in the file
    for await (const line of file.readLines()) {
        //For each char in the alphabet
        for (let i = 0; i < 26; i++) {

            //Try each char
            //Display the assci equivalent of the text.
        }
    }
    return "";
}

/**
 * @param ptext accepts supposed plaintext
 * determines how likely the plaintext is English.
 * Returns -1 if not English.
 */
function score(ptext:string){
    return "";
}

/**
 * Encrypts each byte of plaintext with each byte of key, cycling back to the beginning of the key.
 */
function repeatKeyXor() {

}
export {convertHexBase64, convertHexBinary, convertHexText, fixedXor, xorCipher}


init();
function init() {
//call convertBase with original hex string.
console.log(convertBase("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
));
console.log(fixedXor("1c0111001f010100061a024b53535009181c", "686974207468652062756c6c277320657965"))

}

/**
 * Accepts a base 16 string and converts it to a base 64 string.
 * @param origin
 */
function convertBase(origin: string ){
    let bufferObj= Buffer.from(origin, "hex");
    return bufferObj.toString("base64");
}

/**
 *
 * @param string1
 * @param string2
 */
function fixedXor(string1: string, string2: string) {
    //encode the initial string into base 64
string1 = convertBase(string1);
    //convert string 1 and string 2 into ints
let int1:number = Number(string1);
let int2:number = Number(string2);
    //perform primitive xor
    //return result as a string.
    return (int1^int2).toString();
}

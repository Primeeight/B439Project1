import {convertHexBase64, convertHexBinary, convertHexText, xorCipher} from "../src/HexChallenge.js";

test("Testing converting hex to base64 ", () => {
    expect(convertHexBase64("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d")
    ).toBe("SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t");
});
test("Hex to Binary", ()=>{
    expect(convertHexBinary("F0F0")).toBe("1111000011110000")
});
test("Hex to Text", ()=>{
    expect(convertHexText("48656C6C6F776F726C64")).toBe("Helloworld")
});
test("Hex to Text Again", ()=>{
    expect(convertHexText("00")).toBe(" ")
});
//displays the use of single char "x" for challenge 3.
test("Single Char Xor Cipher", ()=>{
    expect(convertHexText(xorCipher(String.fromCharCode("x".charCodeAt(0)), "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"))).toBe(
"cOOKING mcS LIKE A POUND OF BACON"
    )
});

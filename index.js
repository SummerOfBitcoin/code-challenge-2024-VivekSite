const fs = require("fs");
const crypto = require("crypto");
const bigInt = require("big-integer");

// -----------------Calculate Bits---------------
const target = bigInt(
  "0000ffff00000000000000000000000000000000000000000000000000000000",
  16
);
const bitLength = target.bitLength();
const exponent = Math.floor((bitLength - 1) / 8); // Integer division for exponent
const coefficient = target.mod(256).valueOf();
const shiftedExponent = exponent << 23;
const bits = shiftedExponent | coefficient;

const dificulty = Number.parseInt(
  "0000ffff00000000000000000000000000000000000000000000000000000000"
);

class Block {
  // Constructor function for creating a new Block
  constructor(index, previousBlockHeader = "", timestamp, merkleRoot, bits) {
    this.index = index;
    this.previousBlockHeader = previousBlockHeader;
    this.timestamp = timestamp;
    this.merkleRoot = merkleRoot;
    this.bits = bits;
    this.nonce = this.generateNonce();
    this.header = this.calculateHeaderHash();
  }

  // Generate the random nonce
  generateNonce() {
    const buffer = crypto.randomBytes(4); // Generate 4 random bytes (32 bits)
    return buffer.readUInt32BE(); // Convert to unsigned 32-bit integer (big-endian)
  }

  // Hash the serialized header string with Double SHA256 algorithm
  generateHash(headerString) {
    return crypto
      .createHash("sha256")
      .update(crypto.createHash("sha256").update(headerString).digest())
      .digest("hex");
  }

  // Change the nonce when required–––––––––––
  changeTheNonce() {
    this.nonce = this.generateNonce();
    return;
  }

  // Function for rerializing the header-------------
  calculateHeaderString() {
    return [
      this.index.toString(),
      this.previousBlockHeader,
      this.timestamp.toString(),
      this.merkleRoot,
      this.bits.toString(),
      this.nonce.toString(),
    ].join("");
  }

  // Function for calculating the the Header Hash
  calculateHeaderHash() {
    const headerString = this.calculateHeaderString();
    let hash = this.generateHash(headerString);

    // Calculate the Header Hash until it is less than the target
    while (Number.parseInt(hash) > dificulty) {
      console.log("Trying with different nonce: " + this.nonce);
      this.changeTheNonce();
      hash = this.generateHash(this.calculateHeaderString());
      console.log(hash);
    }

    return hash;
  }
}

// Create a new block
const Block1 = new Block(
  0,
  "",
  Date.now(),
  crypto.createHash("sha256").digest("hex"),
  bits
);

// Write the header to ouput.txt file
fs.writeFile("./output.txt", Block1.header, (err) => {
  if (err) console.error(err);
  console.log("file written successfully.");
});

console.log(Block1);

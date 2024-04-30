const crypto = require('crypto');
const { networks } = require('bitcoinjs-lib');

// const data = "0398b299b41cb7a0e412b2de7eb450e99e42621608902a91a3ac47d0d15495f625"
// const hash = crypto.createHash('ripemd160').update(crypto.createHash('sha256').update(data).digest()).digest("hex");

// console.log(hash);
// console.log("dcfbeddd8daafa20221169eab5a2356500cbc916");

const pkh = "4cf014394e1aa81ca0317ad24c3a886040e80da7";
const sig = "3044022100a7e3beccc1ba05981d5d02b9a387fca7dd352e26249b6b98601b90b641c93b1d021f72ace36567e8eeb09ffedda0708efe61a6d29cc928d6dca4cd7ec2540d302501"
const pubkey = "02e57d639eb8ad9feeda51d951c33feed17c2ad7946c3a7223513fb912a5b2363b"

const verify = bcoin
console.log(verify);
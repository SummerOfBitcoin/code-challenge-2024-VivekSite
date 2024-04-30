// const fs = require('fs');
// const path = require('path');

// const directoryPath = './mempool';
// let totalTx = 0;

// fs.readdir(directoryPath, async (err, files) => {
//     if (err) {
//         console.error('Error reading directory:', err);
//         return;
//     }

//     await files.forEach(async (file, index) => {

//         await fs.readFile(path.join(directoryPath, file), 'utf8', async (err, fileData) => {
//             if (err) {
//                 console.error('Error reading file:', err);
//                 return;
//             }

//             try {
//                 const transactionData = await JSON.parse(fileData);

//                 let inputValue = 0;
//                 transactionData.vin.forEach(input => {
//                     inputValue += input.prevout.value;
//                 })

//                 let outputValue = 0;
//                 transactionData.vout.forEach(output => {
//                     outputValue += output.value;
//                 })

//                 if(inputValue >= outputValue) {
//                     totalTx++;
//                     fs.appendFile("output2.txt", file + "\n", () => {
//                         console.log("Output written");
//                     });
//                 }

//             } catch (error) {
//                 console.error('Error parsing JSON:', error);
//             } 
//         });
//     })
// })

// setTimeout(() => {
//     console.log("The total valid transactions are: ", totalTx);
// }, 2000);

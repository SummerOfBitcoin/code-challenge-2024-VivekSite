const fs = require("fs");
const path = require("path");

const directoryPath = "./mempool";
let fees = 0;

const isEnoughBalance = (transaction) => {
  let input = 0;
  let output = 0;

  transaction.vin.forEach((tx) => {
    input += tx.prevout.value;
  });

  transaction.vout.forEach((tx) => {
    output += tx.value;
  });
  
  return input - output;
};



const addToValidList = (file) => {
  fs.appendFile("output2.txt", file.split(".")[0] + "\n", (err) => {
    if (err) {
      console.error(`[ERROR] while writing the file: ${file}\n${err.message}`);
    }
  });
  return;
};

fs.readdir(directoryPath, async (err, files) => {
  if (err) {
    console.error(
      `[ERROR] while reading directory: ${directoryPath}\n${err.message}`
    );
    return;
  }

  files.forEach((file) => {
    try {
      const fileData = fs.readFileSync(path.join(directoryPath, file), "utf-8");

      const data = JSON.parse(fileData);
      const isEnough = isEnoughBalance(data);

      if(data.vin.is_coinbase) {
          addToValidList(file);
      }

      if (isEnough) {
        // addToValidList(file);
      }
    } catch (error) {
      console.log(
        `[ERROR] while writing the file: ${file}\n${error.message}\n`
      );
    }
  });
});

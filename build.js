const cmd = require("node-cmd");
require("./config");

const rebuild = () => {
  const processRef = cmd.get(
    `gatsby clean && gatsby build`
  );
  let dataLine;
  processRef.stdout.on(`data`, function (data) {
    dataLine += data;
    if (dataLine[dataLine.length - 1] === `\n`) {
      console.log(dataLine);
    }
  });
};

rebuild();

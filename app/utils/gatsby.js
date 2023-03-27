import cmd from "node-cmd";
import "../config";

/*Rebuild on update*/
export function rebuild(cb) {
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
  cb(null, null);
}

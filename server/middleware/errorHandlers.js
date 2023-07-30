/*
  Error Handling Functions: With asynchronous programming, A better approach than repeating the catch try block in each controller, creating error handling functions and pass them around followed by next.
*/

import { logEvents } from "./logger.js";

const nodeVersionENV = () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Node Version is ${process.versions.node} Under Development`);
  }
  const [major, minor] = process.versions.node.split(".").map(parseFloat);
  if (major < 14 || (major === 14 && minor <= 0)) {
    console.log(
      "Please go to nodejs.org and download version 8 or greater. 👌\n "
    );
    process.exit();
  }
};

const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "API URL Doesn't Exist",
  });
};

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}:${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = req.statusCode ? res.statusCode : 500; //Server Error

  res.status(status);

  return res.json({ message: err.message });
};

export { nodeVersionENV, errorHandler, notFound };

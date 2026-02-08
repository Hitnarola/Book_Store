const fs = require("node:fs");
//adding the which method is used in the log.txt file
exports.loger = function (req, res, next) {
  const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
  fs.appendFileSync("log.txt", log, "utf-8");
  next();
};

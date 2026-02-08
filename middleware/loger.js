const fs = require("node:fs");

exports.loger = function (req, res, next) {
  const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
  fs.appendFileSync("log.txt", log, "utf-8");
  next();
};

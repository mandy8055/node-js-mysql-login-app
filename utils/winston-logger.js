const winston = require("winston");

class Logger {
  constructor(applicationName) {
    this.applicationName = applicationName || "node-js-mysql-login-app";

    this.logFormat = winston.format.printf((info) => {
      const formattedDate = info.timestamp.replace("T", " ").replace("Z", "");
      return `[${formattedDate}][${this.applicationName}][${info.level}]${info.message};`;
    });

    this.winston = winston.createLogger({
      level: global.logLevel || "info",
      // level: "debug",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        this.logFormat
      ),
      transports: [new winston.transports.Console({})],
    });
  }
}

const logger = new Logger();

module.exports = logger;

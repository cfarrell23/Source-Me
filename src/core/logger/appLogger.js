const { createLogger, transports, format } = require('winston');
const rotate = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../../../log');
const { combine, timestamp, simple } = format;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logger = createLogger({
  level: 'info',
  transports: [
    new (transports.Console)({
      format: combine(
        timestamp(),
        simple(),
      ),
    }),
    new transports.DailyRotateFile({
      filename: process.env.APP_LOG_FILE_NAME,
      dirname: dir,
      maxsize: 20971520, // 20MB
      maxFiles: 25,
      datePattern: '.dd-MM-yyyy',
    }),
  ],
});

module.exports = logger;

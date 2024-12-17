/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from "winston";
import logform from "logform";

const alignedWithColorsAndTime = winston.format.combine(
  logform.format.colorize(),
  // format.timestamp(),
  logform.format.align(),
  logform.format.printf((info: any) => `${info.level}: ${info.message}`)
);

export const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: alignedWithColorsAndTime,
    }),
  ],
});

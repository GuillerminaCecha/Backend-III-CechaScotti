import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

//Custom format
const customFormat = printf( ( { level, message, timestamp } ) => {
    return `${timestamp} [${level}]: ${message}`;
} );

export const logger = createLogger( {
    level: "info", // Nivel mínimo de log
    format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/combined.log" })
    ]
} )
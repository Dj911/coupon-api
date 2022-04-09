import winston from "winston";
import appRoot from "app-root-path";

// define the custom settings for each transport (file, console)
const options = {
	file: {
		level: "info",
		filename: `${appRoot}/logs/app.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: true,
		timestamp: true,
	},
	console: {
		level: "debug",
		handleExceptions: true,
		json: false,
		colorize: true,
		timestamp: true,
	},
	exceptions: {
		level: "error",
		filename: `${appRoot}/logs/exceptions.log`,
		timestamp: true,
		maxsize: 5242880,
		json: true,
		colorize: true,
	},
};

const logger = new winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
		winston.format.colorize()
	),
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console),
	],
	exceptionHandlers: new winston.transports.File(options.exceptions),
	exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: (message) => {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger.info(message);
	},
};

export default logger;
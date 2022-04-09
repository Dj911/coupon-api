import logger from "../config/logger.js";

//? For Handling Success Response
export const handleResponse = ({
	res,
	statusCode = 200,
	msg = "Success",
	data = {},
	result = 1,
}) => {
	return res.status(statusCode).send({ result, msg, data });
};

//? For Handling Error Response
export const handleError = ({
	res,
	statusCode = 500,
	err = "Error",
	result = 0,
	data = {},
}) => {
	logger.error(err instanceof Error ? err.message : err.msg || err);
	return res.status(statusCode).send({
		result,
		msg: err instanceof Error ? err.message : err.msg || err,
		data: data instanceof Error ? data.message : data.msg || data,
	});
};

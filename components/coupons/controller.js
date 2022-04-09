import createHttpError from "http-errors";
import _ from "lodash";
import logger from "../../config/logger.js";
import { validate } from "../../utils/lodash.js";
import { handleResponse } from "../../helpers/requestHandler.js";
import { createCoupon, getCoupons } from "./service.js";

export const addCoupon = async (req, res, next) => {
	logger.info("Inside addCoupon Controller");
	try {
		const { name, description, expirationDate, location } = req.body;

		const payload = await validate({
			name,
			description,
			expirationDate,
			location,
		});

		const coupon = await createCoupon(payload);

		if (coupon.error) createHttpError(400, coupon.error);

		handleResponse({ res, message: "Success", data: coupon });
	} catch (error) {
		logger.error(error);
		return new createHttpError(401, error);
	}
};

export const getLocationWiseCoupon = async (req, res, next) => {
	logger.info("Inside getLocationWiseCoupon Controller");
	try {
		const { lat, long } = req.params;

		const payload = await validate({ lat, long });

		const coupons = await getCoupons(payload);

		if (coupons.error) createHttpError(400, coupons.error);

		handleResponse({ res, message: "Success", data: coupons });
	} catch (error) {
		logger.error(error);
		return new createHttpError(400, error);
	}
};

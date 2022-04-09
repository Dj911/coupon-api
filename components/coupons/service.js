import logger from "../../config/logger.js";
import Coupon from "./model.js";

export const createCoupon = async (payload) => {
	logger.info("Inside createCoupon Service");
	try {
		const data = await Coupon.create(payload);

		if (!data) return { error: "Unable to create Coupon" };

		return data;
	} catch (error) {
		logger.error(error);
		return { error: error.message };
	}
};

export const getCoupons = async (payload) => {
	logger.info("Inside getCoupons Service");
	try {
		const { lat, long } = payload;

		//? 10 mile radius from the given coordinates
		const radius = 10 / 3963.2;
		const data = await Coupon.find({
			location: {
				$geoWithin: {
					$centerSphere: [[long * 1, lat * 1], radius],
				},
			},
		});

		if (!data) return { error: "Unable to create Coupon" };

		return data;
	} catch (error) {
		logger.error(error);
		return { error: error.message };
	}
};

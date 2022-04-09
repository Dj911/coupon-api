import express from "express";
import createHttpError from "http-errors";
import logger from "../../config/logger.js";
import Coupon from "./model.js";
import { addCoupon, getLocationWiseCoupon } from "./controller.js";

const route = express();

//? Create New Coupon
route.post("/newCoupon", addCoupon);

//? lat and long params are user's latitude and longitude
route.get("/getLocationCoupons/:lat/:long", getLocationWiseCoupon);

export default route;

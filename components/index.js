import { Router } from "express";
import coupon from "./coupons/route.js";

const router = Router();

//? Index route for Coupon
router.use("/coupon", coupon);

export default router;

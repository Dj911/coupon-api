import mongoose from "mongoose";
import db from "../../connection/mongodb.js";

const couponSchema = new mongoose.Schema({
	name: { type: String },
	description: { type: String },
	expirationDate: { type: Date, default: Date.now },
	location: {
		type: { type: String, default: "Point", index: "2dsphere" },
		coordinates: [],
	},
});

const Coupon = db.model("Coupon", couponSchema);

export default Coupon;

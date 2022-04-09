import { config } from "dotenv";

config();

//? All the config variables here
export default {
	db: {
		str:
			process.env.NODE_ENV === "production"
				? process.env.MONGO_STRING
				: process.env.MONGO_STRING,
		options: {
			useNewUrlParser: true,
			readPreference: "primaryPreferred",
		},
	},
};

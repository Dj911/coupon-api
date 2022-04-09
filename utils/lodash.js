import _ from "lodash";

//? Will remove any null or undefined values in the object
export const validate = async (data) => {
	return _.omitBy(data, _.isNil);
};

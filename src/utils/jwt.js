import jsonwebtoken from "jsonwebtoken";
import environment from "../configs/environments.js";

const { SECRET } = environment;

export function generateToken(user) {
	const { _id, email,roles } = user;
	return jsonwebtoken.sign({ id: _id, email,roles: roles }, SECRET, {
		expiresIn: "15m",
	});
}

export function verifyToken(token) {
	return jsonwebtoken.verify(token, SECRET);
}
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.URL;
const SECRET = process.env.SECRET;
export default { URL , SECRET};

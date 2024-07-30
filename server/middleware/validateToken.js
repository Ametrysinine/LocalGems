import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.JWT_KEY
const KEY_STRING = "Testkey123"

console.log(`Our SECRET is: `, SECRET);
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.JWT_KEY

const validateToken = (req, res, next) => {
  const {user_token} = req.body;

  console.log(`Our req.body is: `, req.body);
  console.log(`Our user_token is: `, user_token);

  jwt.verify(user_token, SECRET, (error, decoded) => {
      if(error){
          return res.status(401).json({message: 'Unauthorized'});
      }
      req.userData = {
          user_id: decoded.user_id,
          name: decoded.name,
          email: decoded.email,
          pfp: decoded.pfp
      }
      next();
  });
}

export default validateToken;
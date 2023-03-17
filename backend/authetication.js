import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticate = (req,res,next)=>{
    const auth_header = req.headers['authorization'];
    if(auth_header==null){
        res.sendStatus(401)
    }
    else{
        const token = auth_header.split(' ')[1];
        jwt.verify(token,process.env.TOKEN,(err,obj)=>{
            if(err){
                res.sendStatus(403)
            }
            else{
                req.userId = obj.userId;
                next()
            }
        })
    }
    
}

export default authenticate;

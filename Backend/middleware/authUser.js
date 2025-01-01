import jwt from "jsonwebtoken"


const authUser = async (req,res,next)=>{
    try {
        const {token} = req.headers;
     

        if(!token){
            return res.json({
                message:"User not autheticated",
                success:false
            })
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.json({
                message:"Invalid token",
                success:false
            })
        }
        req.body.userId = decode.id
        next();
        } catch(error){
            console.error( error);
            res.json({success:false, message:"Authentication failed"})
        }
    }
    
export default authUser
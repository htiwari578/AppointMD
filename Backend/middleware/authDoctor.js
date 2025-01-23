import jwt from "jsonwebtoken"

export const authDoctor = async(req,res,next) => {
     try {
            
    
            const {doctoken} = req.headers;
           
            if(!doctoken){
                return res.json({
                    message:"Not authorized Login again",
                    success:false
                })
            }
            // if token exist
            const decode = await jwt.verify(doctoken, process.env.JWT_SECRET_KEY)
            req.body.docId = decode.id
            next()
        } catch (error) {
            console.log(error)
            res.json({message:error.message,success:false})
        }
    }

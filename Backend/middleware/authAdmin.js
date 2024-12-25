import jwt from 'jsonwebtoken'

// admin authentication middleware 







export const authAdmin = async (req,res,next)=> {
    try {
        

        const {atoken} = req.headers;
       
        if(!atoken){
            return res.json({
                message:"Not authorized Login agin",
                success:false
            })
        }
        // if token exist
        const decode = await jwt.verify(atoken, process.env.JWT_SECRET_KEY)
        if(decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({
                message:"Invalid token",
                success:false
            })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({message:error.message,success:false})
    }
}
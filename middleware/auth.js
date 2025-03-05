import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    // if (!token) {
    //     // Allow guest users to proceed without setting `userId`
    //     req.body.userId = null;
    //     return next();  // Continue to the next middleware
    // }
    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export default authUser
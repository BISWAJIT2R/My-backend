const  asyncFunctionHandler = (func) => async (req,  res, next) => {
    try {
        await func(req,  res,  next)
    } catch (error) {
        res.status(error.code).json({
            mssage: "Something went Wrong"
        })
    }
}
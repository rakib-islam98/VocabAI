const asyncHandler = (fn) =>{
    //return another function
    return (req,res,next) => {
        Promise.resolve(fn(req,res,next)).catch(next);
    };
};

export default asyncHandler;
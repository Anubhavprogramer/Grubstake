import ErrorHandler from "../utils/errorHandler.js";

const asyncHandler = (thefunc) => (req, res, next) => {
    Promise.resolve(thefunc(req, res, next)).catch(next);
};

export default asyncHandler;

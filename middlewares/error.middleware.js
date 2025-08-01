const errorMiddleware = (err, req, res, next) => {
    try {

        let error = {...err};
        error.message = err.message;
        console.error(err);

        //mongoose bad objectid

        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate key error';
            error = new Error(message);
            error.statusCode = 400;
        }

        // mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((error) => error.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            message: error.message || 'Something went wrong',
        });






    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
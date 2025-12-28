const { ZodError } = require('zod');


const formatZodError = (error) => {
    if (!error || !error.errors || !Array.isArray(error.errors)) {
        return { root: 'Validation error', message: 'Invalid request data' };
    }

    const formatted = {};

    error.errors.forEach(err => {
        const field = err.path && err.path.length > 0 ? err.path[0] : 'root';

        if (!formatted[field]) {
            formatted[field] = err.message;
        }
    });

    return formatted;
};


const handleError = (error, res) => {
    if (error instanceof ZodError || (error && error.name === 'ZodError')) {
        return res.status(400).json({
            errors: formatZodError(error),
        });
    }

    if (error && error.statusCode) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }

    return res.status(500).json({
        error: 'Internal Server Error',
    });
};

module.exports = { handleError };


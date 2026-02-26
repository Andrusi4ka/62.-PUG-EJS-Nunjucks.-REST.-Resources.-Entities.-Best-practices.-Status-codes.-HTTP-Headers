export const errorHandler = ((err, req, res, next) => {
    if (!res.headersSent) {
        res
            .status(err.status || 500)
            .json({ error: err.message || 'Internal Server Error' })
    }
})
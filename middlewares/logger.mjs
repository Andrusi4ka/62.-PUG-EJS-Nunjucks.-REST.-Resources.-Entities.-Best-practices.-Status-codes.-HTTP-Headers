export const logger = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
}
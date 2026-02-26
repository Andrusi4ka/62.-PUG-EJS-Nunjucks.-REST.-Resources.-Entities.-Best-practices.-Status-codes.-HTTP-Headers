import express from 'express'
import router from './routes/root.mjs'
import { logger } from '../middlewares/logger.mjs';
import { errorHandler } from '../middlewares/errorHandler.mjs';
import { notFoundHtmlHandler } from '../middlewares/notFoundHtmlHandler.mjs';

const PORT = 3000;
const app = express();

app.use(express.static('public'))
app.use(express.json());

app.use(logger);

app.use(router);

app.use(errorHandler);
app.use(notFoundHtmlHandler);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
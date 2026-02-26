import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/root.mjs'
import { logger } from '../middlewares/logger.mjs';
import { errorHandler } from '../middlewares/errorHandler.mjs';
import { notFoundHtmlHandler } from '../middlewares/notFoundHtmlHandler.mjs';

const PORT = 3000;
const app = express();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.set('view engine', 'pug');
app.set('views', path.join(dirname, '../views'));

app.use(express.static('public'))
app.use(express.json());

app.use(logger);

app.use(router);

app.use(errorHandler);
app.use(notFoundHtmlHandler);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

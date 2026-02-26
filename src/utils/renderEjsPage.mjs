import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const ejsViewsDir = path.join(dirname, '../../views-ejs');

export const renderEjsPage = async (res, next, view, title, data = {}) => {
    try {
        const body = await ejs.renderFile(
            path.join(ejsViewsDir, `${view}.ejs`),
            data,
            { async: true }
        );

        const html = await ejs.renderFile(
            path.join(ejsViewsDir, 'layout.ejs'),
            {
                title,
                body,
                theme: res.locals.theme,
                currentPath: res.locals.currentPath
            },
            { async: true }
        );

        res.send(html);
    } catch (error) {
        next(error);
    }
};

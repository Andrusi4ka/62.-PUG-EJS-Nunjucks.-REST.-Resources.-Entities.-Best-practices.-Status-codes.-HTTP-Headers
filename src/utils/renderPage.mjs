import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderPage(title, content, res) {
    const layoutPath = path.join(__dirname, '../../public/layout.html');
    let html = fs.readFileSync(layoutPath, 'utf8');

    html = html.replace('{{title}}', title);
    html = html.replace('{{content}}', content);

    res.send(html);
}
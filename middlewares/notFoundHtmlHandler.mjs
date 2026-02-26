import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const notFoundHtmlHandler = (req, res) => {
    res.status(404).sendFile(path.join(dirname, '../public/404.html'))
}
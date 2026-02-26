export const notFoundHtmlHandler = (req, res) => {
    res.status(404).render('404', { title: '404 - Сторінку не знайдено' })
}

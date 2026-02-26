export const getRootHandler = (req, res) => {
    res.render('index', { title: 'Home' });
};

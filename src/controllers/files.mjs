import formidable from 'formidable';

export const getFilesHandler = (req, res) => {
    res.render('files/index', { title: 'Files' });
};

export const postFilesHandler = (req, res, next) => {
    const form = formidable({
        uploadDir: 'uploads',
        keepExtensions: true,
        multiples: true
    });

    form.parse(req, (err, fields, files) => {
        if (err) return next(err);

        const uploadedFiles = files.files;

        if (!uploadedFiles || (Array.isArray(uploadedFiles) && uploadedFiles.length === 0)) {
            return res.render('files/no-files', { title: 'Error' });
        }

        res.render('files/upload-result', { title: 'Upload result', uploadedFiles });
    });
};


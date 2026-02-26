import formidable from 'formidable';
import { renderPage } from '../utils/renderPage.mjs';

export const getFilesHandler = (req, res) => {
    renderPage(
        'Files',
        `
        <h1 class="mb-5">Files page</h1>
        <form action="/files" method="POST" enctype="multipart/form-data" class="d-flex gap-5">
            <input type="file" id="filesInput" name="files" class="form-control" multiple required />
            <button type="submit" class="btn btn-primary">Upload</button>
        </form>
        <div class="mt-3">
            <ul id="selectedFilesList" class="list-group"></ul>
        </div>

        <script>
            const input = document.getElementById('filesInput');
            const list = document.getElementById('selectedFilesList');

            input.addEventListener('change', () => {
                list.innerHTML = '';
                const files = Array.from(input.files);

                if (files.length === 0) return;

                for (const f of files) {
                    const li = document.createElement('li');
                    li.className = 'list-group-item';
                    li.textContent = f.name;
                    list.appendChild(li);
                }
            });
        </script>
        `,
        res
    );
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
            return renderPage(
                'Error',
                '<h1>No files selected</h1><a href="/files">Back</a>',
                res
            );
        }

        renderPage(
            'Upload result',
            `
        <h1 class="mb-5">Upload success</h1>
        <pre>${JSON.stringify(uploadedFiles, null, 2)}</pre>
        `,
            res
        );
    });
};


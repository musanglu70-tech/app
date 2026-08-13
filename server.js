import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const port = Number(process.env.PORT) || 3000;

const app = express();

const sendDistFile = (relativePath, contentType) => (req, res, next) => {
  const distPath = path.join(distDir, relativePath);
  if (fs.existsSync(distPath)) {
    res.setHeader('Content-Type', contentType);
    return res.sendFile(distPath, (err) => {
      if (err) {
        next(err);
      }
    });
  }

  const publicPath = path.join(__dirname, 'public', relativePath);
  if (fs.existsSync(publicPath)) {
    res.setHeader('Content-Type', contentType);
    return res.sendFile(publicPath, (err) => {
      if (err) {
        next(err);
      }
    });
  }

  res.status(404).type('text/plain').send('Not Found');
};

app.get('/manifest.json', sendDistFile('manifest.json', 'application/manifest+json'));
app.get('/.well-known/assetlinks.json', sendDistFile('.well-known/assetlinks.json', 'application/json'));

app.use(express.static(distDir, { index: false, setHeaders(res, filePath) { if (filePath.endsWith('manifest.json')) { res.setHeader('Content-Type', 'application/manifest+json'); } } }));

app.get('*', (req, res, next) => { if (path.extname(req.path)) { return res.status(404).type('text/plain').send('Not found'); } res.sendFile(path.join(distDir, 'index.html'), (err) => { if (err) { next(err); } }); });

app.use((err, _req, res, _next) => { console.error(err); res.status(500).type('text/plain').send('Internal Server Error'); });

app.listen(port, '0.0.0.0', () => { console.log(`Server listening on port ${port}`); });
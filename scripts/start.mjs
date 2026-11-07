import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join, normalize, sep } from 'path';

const port = process.env.PORT || 3000;
const root = process.cwd();

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png'
};

createServer(async (req, res) => {
  try {
    // Drop any ?query or #hash; decoding fails on bad % escapes, which lands in the 404 path.
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    // Cloud Run startup probe and scripts/smoke.sh.
    if (pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('ok');
    }
    const urlPath = pathname === '/' ? '/index.html' : pathname;
    const filePath = join(root, normalize(urlPath));
    if (!filePath.startsWith(root + sep)) throw new Error('Path escapes root');
    const content = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] || 'text/plain; charset=utf-8' });
    res.end(content);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}).listen(port, () => {
  console.log(`ClearSpeak MVP running at http://localhost:${port}`);
});

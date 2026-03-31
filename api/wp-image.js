export default async function handler(req, res) {
  const { path } = req.query;
  if (!path) return res.status(400).send('Missing path');

  const imageUrl = `http://3.135.32.209/wp-content/uploads/${Array.isArray(path) ? path.join('/') : path}`;

  try {
    const response = await fetch(imageUrl, {
      headers: { 'Host': 'premierdentalnc.com' },
    });

    if (!response.ok) return res.status(response.status).send('Not found');

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(buffer);
  } catch {
    res.status(502).send('Failed to fetch image');
  }
}

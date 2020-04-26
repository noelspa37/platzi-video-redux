import express from 'express';
import React from 'react';
import App from '../dist/ssr/app';
import { StaticRouter } from 'react-router';
import reactDOMServer from 'react-dom/server';
const app = express();

app.use(express.static('dist'));
app.use('/images', express.static('images'));

app.get('*', (req, res) => {
  const html = reactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={{
        name: 'Noel',
      }}
    >
      <App />
    </StaticRouter>
  );

  console.log(req.url);
  res.write(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Platzi Video</title>
      <link rel="stylesheet" href="/css/app.css">
    </head>
    <body>
      <div id="home-container">Hola Mundo ${html}</div>
      <div id="modal-container"></div>
      <script src="/js/app.js"></script>
    </body>
  </html>`);
  res.end();
});

app.listen(3000);
console.log('El server prendio en el puerto 3000');

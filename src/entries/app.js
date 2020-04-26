import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../pages/containers/app';

const homeContainer = document.getElementById('home-container');

// render(
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  homeContainer
);

/*
  Este archivo solo se renderizará en el navegador
*/

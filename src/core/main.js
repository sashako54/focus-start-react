import ReactDom from 'react-dom';
import React from 'react';
import Root from './root';

const rootElement = document.querySelector('#root');

ReactDom.render(<Root />, rootElement);

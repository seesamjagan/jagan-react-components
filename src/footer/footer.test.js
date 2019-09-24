import React from 'react';
import ReactDOM from 'react-dom';
import {Footer } from './footer';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

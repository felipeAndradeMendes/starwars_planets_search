import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import InputProvider from './context/InputProvider';
import PlanetsProvider from './context/PlanetsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <InputProvider>
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
      ,
    </InputProvider>,
  );

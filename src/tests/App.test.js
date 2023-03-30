import React from 'react';
import App from '../App';
import InputProvider from '../context/InputProvider';
import PlanetsProvider from '../context/PlanetsProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TESTES GERAIS', () => {
  test('Os inputs são renderizados na tela', () => {
    render(
      <InputProvider>
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      ,
      </InputProvider>,
    )
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();
    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toBeInTheDocument();
    
    screen.logTestingPlaygroundURL();
  });
});

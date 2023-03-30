import React from 'react';
import App from '../App';
import InputProvider from '../context/InputProvider';
import PlanetsProvider from '../context/PlanetsProvider';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

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
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    const buttonFilter = screen.getByRole('button', { name: /filtrar/i });
    expect(buttonFilter).toBeInTheDocument();
    
  });
  
  test('Numero de linhas da tabela renderizada está correto na inicialização', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(
      <InputProvider>
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      ,
      </InputProvider>,
    )

    const loading = screen.getByText(/loading.../i);
    expect(loading).toBeInTheDocument();

    // waitFor(() => {
    //   loading
    // });
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    
    const tableRows = await screen.findByTestId('table-testid');
    expect(tableRows).toBeInTheDocument();
    expect(tableRows.children.length).toBe(10);

  });

  test('Input name retorna planetas esperados na tabela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render(
      <InputProvider>
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      ,
      </InputProvider>,
    )
    const nameFilter = await screen.findByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();
    
    userEvent.type(nameFilter, 'ot');
    
    waitFor(() => {
      expect(screen.getByText('/loading.../i')).not.toBeInTheDocument();
    })
    
    expect(await screen.findByRole('cell', { name: /hoth/i})).toBeVisible();
    expect(screen.queryByRole('cell', { name: /Dagobah/i})).not.toBeInTheDocument();
  });

  test('Filtros combinados retornam planetas esperados na tabela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render(
      <InputProvider>
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      ,
      </InputProvider>,
    )

    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toBeInTheDocument();
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    const buttonFilter = screen.getByRole('button', { name: /filtrar/i });
    expect(buttonFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '9000');
    userEvent.click(buttonFilter);

    const tableRows = await screen.findByTestId('table-testid');
    expect(tableRows.children.length).toBe(7);

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '1000000');
    userEvent.click(buttonFilter);

    screen.logTestingPlaygroundURL();

    expect(tableRows.children.length).toBe(2);

  });

});

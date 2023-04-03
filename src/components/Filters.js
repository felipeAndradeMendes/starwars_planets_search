import { useContext } from 'react';
import InputContext from '../context/InputContext';
import PlanetsContext from '../context/PlanetsContext';
import { columnOptions, comparisonFilterOptions } from '../helpers/helpers';

function Filters() {
  const { searchInput,
    setSearchInput,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    setFilterByNumericValues,
    filterByNumericValues,
    setSortedPlanetsToRender,
    sortOrder,
    setSortOrder,
  } = useContext(InputContext);

  const { planets } = useContext(PlanetsContext);

  /* Retorna opções de coluna não utilizadas */
  const columnsToBeRender = () => {
    // Retorna coluna usadas a partir dos objetos armazenados em filterByNumericValues;
    const columnsUsed = filterByNumericValues.map((filter) => filter.column);
    // Filtra colunas que não foram usadas para serem renderizadas nas options;
    const columnsToBeRendered = columnOptions.filter(
      (column) => !columnsUsed.includes(column),
    );
    return columnsToBeRendered;
  };
  /* Cria objeto com as opções escolhidas nos filtros comibnadas.
    Será usado para renderizar os filtros na tela a cada filtragem. */
  const constroyAndSetCombinedFiltersObj = () => {
    const combinedFiltersObj = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    setFilterByNumericValues([...filterByNumericValues, combinedFiltersObj]);
    setColumnFilter(columnsToBeRender()[1]);
  };

  // função chamada pelo onclik FILTRAR
  const filterCombinedSelectors = () => {
    constroyAndSetCombinedFiltersObj();
  };

  const deleteSingleFilter = (value) => {
    // Filtra novo array sem o filtro deletado e atualiza estado;
    const filteredArray = filterByNumericValues.filter((item) => item.column !== value);
    setFilterByNumericValues(filteredArray);
  };

  const removeFilters = () => {
    setFilterByNumericValues([]);
  };

  const sortPlanets = () => {
    const planetsWithoutUnknown = planets
      .filter((planet) => planet[sortOrder.column] !== 'unknown');

    const planetsUnknown = planets
      .filter((planet) => planet[sortOrder.column] === 'unknown');

    if (sortOrder.sort === 'ASC') {
      setSortedPlanetsToRender([...planetsWithoutUnknown
        .sort((a, b) => a[sortOrder.column] - b[sortOrder.column]), ...planetsUnknown]);
    }

    if (sortOrder.sort === 'DESC') {
      setSortedPlanetsToRender([...planetsWithoutUnknown
        .sort((a, b) => b[sortOrder.column] - a[sortOrder.column]), ...planetsUnknown]);
    }
  };

  console.log(' ');
  console.log(' ');

  return (
    <>
      <h3>FILTROS</h3>
      {/* {NAME FILTER} */}
      <label htmlFor="nameFilter">
        <input
          id="nameFilter"
          data-testid="name-filter"
          type="text"
          name="nameFilter"
          placeholder="Busca"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
        />
      </label>
      {/* {COLUMN FILTER} */}
      <label htmlFor="columnFilter">
        <select
          data-testid="column-filter"
          name="columnFilter"
          id="columnFilter"
          value={ columnFilter }
          onChange={ (e) => setColumnFilter(e.target.value) }
        >
          {columnsToBeRender().map((optionColumn) => (
            <option
              key={ optionColumn }
              value={ optionColumn }
            >
              { optionColumn }
            </option>
          ))}
        </select>
      </label>
      {/* {COMPARISON FILTER} */}
      <label htmlFor="comparisonFilter">
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          id="comparisonFilter"
          value={ comparisonFilter }
          onChange={ (e) => setComparisonFilter(e.target.value) }
        >
          {comparisonFilterOptions.map((optionComparison) => (
            <option
              key={ optionComparison }
              value={ optionComparison }
            >
              { optionComparison }
            </option>
          ))}
        </select>
      </label>
      {/* {VALUE FILTER} */}
      <label htmlFor="valueFilter">
        <input
          type="text"
          data-testid="value-filter"
          id="valueFilter"
          name="valueFilter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
      </label>
      {/* {BUTTON} */}
      <input
        data-testid="button-filter"
        type="button"
        name="buttonFilter"
        value="FILTRAR"
        onClick={ () => filterCombinedSelectors() }
      />
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => removeFilters() }
      >
        Remover Filtros
      </button>
      {/* {COMBINED FILTERS} */}
      <div>
        {filterByNumericValues.map((filter) => (
          <div data-testid="filter" key={ filter.column }>
            <p>
              {`${filter.column} ${filter.comparison} ${filter.value}`}
            </p>
            <button
              type="button"
              id={ filter.column }
              name={ filter.column }
              onClick={ () => deleteSingleFilter(filter.column) }
            >
              delete
            </button>
          </div>
        ))}
      </div>
      {/* {SORT FILTERS} */}
      <label htmlFor="columnSort">
        {' '}
        Ordenar
        {' '}
        <select
          data-testid="column-sort"
          name="columnSort"
          id="columnSort"
          value={ sortOrder.column }
          onChange={ (e) => setSortOrder({ ...sortOrder, column: e.target.value }) }
        >
          {columnOptions.map((optionColumn) => (
            <option
              key={ optionColumn }
              value={ optionColumn }
            >
              { optionColumn }
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="sortRadioAsc">
        Ascendente
        <input
          id="sortRadioAsc"
          data-testid="column-sort-input-asc"
          type="radio"
          value="ASC"
          name="sortRadio"
          onClick={ () => setSortOrder({ ...sortOrder, sort: 'ASC' }) }
        />
      </label>
      <label htmlFor="sortRadioDesc">
        Descendente
        <input
          id="sortRadioDesc"
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          name="sortRadio"
          onClick={ () => setSortOrder({ ...sortOrder, sort: 'DESC' }) }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        name="sortButton"
        onClick={ () => sortPlanets() }
      >
        Ordenar
      </button>
    </>
  );
}

export default Filters;

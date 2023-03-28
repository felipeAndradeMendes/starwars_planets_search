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
    setCombinedFilters,
  } = useContext(InputContext);

  const { planets } = useContext(PlanetsContext);

  console.log('COLUMN FILTER:', columnFilter);
  console.log('COMPARISON FILTER:', comparisonFilter);
  // console.log(valueFilter);

  const filterCombinedSelectors = (column, comparison, value) => {
    // filterColumn = planets.filter((planet) => planet[column]);
    const filterComp = planets.filter((planet) => {
      if (comparison === 'maior que') {
        return planet[column] > value;
      } if (comparison === 'menor que') {
        return planet[column] < value;
      }
      return planet[column] === value;
    });
    setCombinedFilters(filterComp);
  };

  // FIZ UM CONSOLE NA TABLE E PERCEBI QUE NAO ESTA FILTRANDO
  // ATENÇÃO AO DADOS QUE RETORNAM UNKNOWN
  // DE RESTO ESTÁ TUDO FUNCIONANDO

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

      <input
        data-testid="button-filter"
        type="button"
        name="buttonFilter"
        value="FILTRAR"
        onClick={ () => filterCombinedSelectors() }
      />

    </>
  );
}

export default Filters;

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
    combinedFilters,
    setFilterByNumericValues,
    filterByNumericValues,
  } = useContext(InputContext);

  const { planets } = useContext(PlanetsContext);

  /* Retorna opções de coluna não utilizadas */
  const columnsToRender = () => {
    // Retorna coluna usadas a partir dos objetos armazenados em filterByNumericValues;
    const columnsUsed = filterByNumericValues.map((filter) => filter.column);
    console.log('COLUMN OPTIONS:', columnOptions);
    console.log('COLUMNS USED:', columnsUsed);
    // Filtra colunas que não foram usadas para serem renderizadas nas options;
    const colmunsToBeRendered = columnOptions.filter(
      (column) => !columnsUsed.includes(column),
    );
    console.log('COLUMNS TO BE RENDERED:', colmunsToBeRendered);
    return colmunsToBeRendered;
  };

  // função chamada pelo onclik FILTRAR
  /* Botão filtrar chama a função, após options escolhidos.
  Mapeia os planetas de acordo com as escolhas de busca */
  const filterCombinedSelectors = () => {
    /* Se combinedFilters já tiver algum valor, faz novo filtro a partir desse array.
    Se combined filter não estiver preenchido, filtra a partir dos planetas originais,
    mas sob as condições dos filtros cominados iniciais "population maior que 0".
    Poderia deixar sem esse map dos planetas aoriginais, mas não atrapalhou, eu acho */
    const arrayToMap = combinedFilters.length === 0 ? planets : combinedFilters;
    const filterComp = arrayToMap.filter((planet) => {
      if (comparisonFilter === 'maior que') {
        return planet[columnFilter] > Number(valueFilter);
      } if (comparisonFilter === 'menor que') {
        return planet[columnFilter] < Number(valueFilter);
      } if (comparisonFilter === 'igual a') {
        return planet[columnFilter] === valueFilter;
      }
      return arrayToMap;
    });
    /* Cria objeto com as opções escolhidas nos filtros comibnadas.
    Será usado para renderizar os filtros na tela a cada filtragem. */
    const combinedFiltersObj = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    // Seta combinedFilter com os array filtrado acima, que erá usado na Table.
    setCombinedFilters(filterComp);
    // Atualiza filterByNumericValues com o novo objeto de filtros combinados.
    setFilterByNumericValues([...filterByNumericValues, combinedFiltersObj]);
    // Seta valor inicial da columnFilter para o prmeiro item do array de opções não usadas.
    setColumnFilter(columnsToRender()[0]);
  };

  const resetCombinedFilters = () => {
    const res = filterByNumericValues.map((option) => {
      const newObj = {
        column: option.column,
        comparison: option.comparison,
        value: option.value,
      };
      return newObj;
    });
    console.log('***TESTE***:', res);
  };

  const deleteSingleFilter = (value) => {
    const filteredArray = filterByNumericValues.filter((item) => item.column !== value);
    setFilterByNumericValues(filteredArray);
    resetCombinedFilters();

    // console.log('FILTER BY NUMERICAL VALUES:', filterByNumericValues);
  };

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
          {columnsToRender().map((optionColumn) => (
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
    </>
  );
}

export default Filters;

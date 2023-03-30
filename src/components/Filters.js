import { useContext } from 'react';
import InputContext from '../context/InputContext';
// import PlanetsContext from '../context/PlanetsContext';
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
  } = useContext(InputContext);

  // const { planets } = useContext(PlanetsContext);

  /* Retorna opções de coluna não utilizadas */
  const columnsToBeRender = () => {
    // Retorna coluna usadas a partir dos objetos armazenados em filterByNumericValues;
    const columnsUsed = filterByNumericValues.map((filter) => filter.column);
    console.log('COLUMN OPTIONS:', columnOptions);
    console.log('COLUMNS USED:', columnsUsed);
    // Filtra colunas que não foram usadas para serem renderizadas nas options;
    const columnsToBeRendered = columnOptions.filter(
      (column) => !columnsUsed.includes(column),
    );
    console.log('COLUMNS TO BE RENDERED:', columnsToBeRendered);
    return columnsToBeRendered;
  };

  const constroyAndSetCombinedFiltersObj = () => {
    const combinedFiltersObj = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    setFilterByNumericValues([...filterByNumericValues, combinedFiltersObj]);
    console.log('COLUMNS TO RENDER 02', columnsToBeRender());
    setColumnFilter(columnsToBeRender()[1]);
  };

  // função chamada pelo onclik FILTRAR
  /* Botão filtrar chama a função, após options escolhidos.
  Mapeia os planetas de acordo com as escolhas de busca */
  const filterCombinedSelectors = () => {
    /* Se combinedFilters já tiver algum valor, faz novo filtro a partir desse array.
    Se combined filter não estiver preenchido, filtra a partir dos planetas originais,
    mas sob as condições dos filtros cominados iniciais "population maior que 0".
    Poderia deixar sem esse map dos planetas aoriginais, mas não atrapalhou, eu acho */

    // const arrayToMap = combinedFilters.length === 0 ? planets : combinedFilters;
    // const filterComp = arrayToMap.filter((planet) => {
    //   if (comparisonFilter === 'maior que') {
    //     return planet[columnFilter] > Number(valueFilter);
    //   } if (comparisonFilter === 'menor que') {
    //     return planet[columnFilter] < Number(valueFilter);
    //   } if (comparisonFilter === 'igual a') {
    //     return planet[columnFilter] === valueFilter;
    //   }
    //   return arrayToMap;
    // });

    /* Cria objeto com as opções escolhidas nos filtros comibnadas.
    Será usado para renderizar os filtros na tela a cada filtragem. */

    // const combinedFiltersObj = {
    //   column: columnFilter,
    //   comparison: comparisonFilter,
    //   value: valueFilter,
    // };
    constroyAndSetCombinedFiltersObj();
    // Seta combinedFilter com os array filtrado acima, que erá usado na Table.
    // setCombinedFilters(filterComp);

    // Atualiza filterByNumericValues com o novo objeto de filtros combinados.
    // setFilterByNumericValues([...filterByNumericValues, combinedFiltersObj]);

    // Seta valor inicial da columnFilter para o prmeiro item do array de opções não usadas.
    // setColumnFilter(columnsToRender()[0]);
  };

  const deleteSingleFilter = (value) => {
    // Resgata obj do filtro deletado;
    const filterToBeDeleted = filterByNumericValues
      .filter((item) => item.column === value);

    // Filtra novo array sem o filtro deletado e atualiza estado;
    const filteredArray = filterByNumericValues.filter((item) => item.column !== value);
    setFilterByNumericValues(filteredArray);
    // resetCombinedFilters(filterToBeDeleted);

    console.log('VALUE:', filterToBeDeleted);
    // console.log('FILTER BY NUMERICAL VALUES:', filterByNumericValues);
  };

  const removeFilters = () => {
    setFilterByNumericValues([]);
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
    </>
  );
}

export default Filters;

/* Para renderizar a tabela de acordo com os filtros, fazer diretamente no array planets.
Assim, a tabela sempre será renderizada a partir dos filtros, independente de tudo. Se houver
filtro, renderiza baseado nele, se não houver, renderiza normal. Aplicar esse filtro no momento da renderização. */

/* Acabei o dia percebendo que esse map-filter acima está errado. Primeiro pq teria que retornar
  novo estado a cada passada nos itens do array de filterByNUmericalvalues. Segundo a primeira passada
  usa como paramentro o array planets e as passadas seguintes teria que usar o novo estado como paramentro,
  para compor o array a ser renderizado na Table.
  Tem que achar uma maneira que:
  1- Filtra o array de referencia "planets" baseado no primeiro filtro combinado (do array filterByNumericValues);
  2- Armazena num estado 'X' e renderiza na Table o que sobrou do filtro;
  3- Se houver de um filtro, faz a segunda filtrada, agora no estado "X" usando os paramentros do segundo filtro
  4- Armazena no estado "X" e renderiza na Table.
  5- Repete se houver outro filtro.

  Os passos acima são feitos num só clique de deletar um filtro.
  Se deletar outro filtro, o processo inteiro se repete, começando do array planets.

  Possiveis soluções:
  - Fazer alguma condicional para a segunda passada mudar do array planets para o do estado "X".
  - Consertar o modo de uso dess filter-map, pq acho que não está alcançando a finalidade.
  OBS: Na função acima, invetid os sinais > < ===  nos ifs, para pegar o contrário do que os filtros trazem */

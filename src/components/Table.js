import React, { useContext } from 'react';
import InputContext from '../context/InputContext';
import PlanetsContext from '../context/PlanetsContext';
import { headers } from '../helpers/helpers';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const { searchInput,
    combinedFilters,
    filterByNumericValues,
    sortedPlanetsToRender,
  } = useContext(InputContext);

  console.log('COMBINED FILTERS:', combinedFilters);

  /* Filtra a tabela de planetas por nome.
  Mapeia os planetas cujo termo de busca esta presente no nome. */
  const filterSearchInput = planets.filter((planet) => planet.name
    .toLowerCase().includes(searchInput.toLowerCase()));
  console.log('FILTERED BY NAME:', filterSearchInput);

  const combinedFilteredPlanets = () => {
    const render = planets.filter((planet) => {
      let match = true;
      filterByNumericValues.forEach((filter) => {
        const value = Number(planet[filter.column]);
        switch (filter.comparison) {
        case 'maior que':
          match = match && value > Number(filter.value);
          break;
        case 'menor que':
          match = match && value < Number(filter.value);
          break;
        default:
          match = match && value === Number(filter.value);
          break;
        }
      });
      return match;
    });
    return render;
  };

  const planetsToRender = () => {
    if (sortedPlanetsToRender.length !== 0) {
      return sortedPlanetsToRender;
    }
    if (searchInput === '') {
      return combinedFilteredPlanets();
    }
    if (searchInput !== '') { return filterSearchInput; }
  };

  console.log('PLANETS TO RENDER', planetsToRender());

  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={ header }>
              { header }
            </th>
          ))}
        </tr>
      </thead>
      <tbody data-testid="table-testid">
        {/* Usa retorno da função abaixo para renderizar a tabela */}
        {
          planetsToRender().map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>

            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;

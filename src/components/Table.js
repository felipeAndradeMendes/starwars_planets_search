import React, { useContext } from 'react';
import InputContext from '../context/InputContext';
import PlanetsContext from '../context/PlanetsContext';
import { headers } from '../helpers/helpers';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const { searchInput,
    combinedFilters,
    filterByNumericValues,
  } = useContext(InputContext);

  console.log('COMBINED FILTERS:', combinedFilters);

  /* Filtra a tabela de planetas por nome.
  Mapeia os planetas cujo termo de busca esta presente no nome. */
  const filterSearchInput = planets.filter((planet) => planet.name
    .toLowerCase().includes(searchInput.toLowerCase()));
  console.log('FILTERED BY NAME:', filterSearchInput);

  /* Se os filtros combinados estiverem vazios: se o input por vazio retorna a lista
  completa de planetas, se estiver com algum termo, retorna a constante acima;
  Se os filtros combinados estiverem preenchidos, retorna esse array. */
  // const planetsToRender = () => {
  //   if (combinedFilters.length === 0) {
  //     if (searchInput === '') { return planets; }
  //     if (searchInput !== '') { return filterSearchInput; }
  //   } else {
  //     return combinedFilters;
  //   }
  // };

  const resultado = () => {
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
        // default:
        //   break;
        }
      });
      return match;
    });
    return render;
  };

  // const resultado = () => {
  //   const render = planets.filter((planet) => {
  //     let isTrue = true;
  //     filterByNumericValues.forEach((filter) => {
  //       if (filter.comparison === 'maior que') {
  //         isTrue = planet[filter.column] > Number(filter.value);
  //       } if (filter.comparison === 'menor que') {
  //         isTrue = planet[filter.column] < Number(filter.value);
  //       } if (filter.comparison === 'igual a') {
  //         isTrue = planet[filter.column] === filter.value;
  //       }
  //     });
  //     return isTrue;
  //   });
  //   return render;
  // };

  // console.log('RESULTADO!', resultado());

  const planetsToRender = () => {
    if (searchInput === '') { return resultado(); }
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
              <td>{planet.name}</td>
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

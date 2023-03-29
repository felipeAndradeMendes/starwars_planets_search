import React, { useContext } from 'react';
import InputContext from '../context/InputContext';
import PlanetsContext from '../context/PlanetsContext';
import { headers } from '../helpers/helpers';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const { searchInput, combinedFilters } = useContext(InputContext);

  console.log('COMBINED FILTERS:', combinedFilters);

  const filterSearchInput = planets.filter((planet) => planet.name
    .toLowerCase().includes(searchInput.toLowerCase()));
  console.log('FILTERED BY NAME:', filterSearchInput);

  const planetsToRender = () => {
    if (combinedFilters.length === 0) {
      if (searchInput === '') { return planets; }
      if (searchInput !== '') { return filterSearchInput; }
    } else {
      return combinedFilters;
    }
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
      <tbody>
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

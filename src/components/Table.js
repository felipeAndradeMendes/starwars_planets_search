import React, { useContext } from 'react';
import InputContext from '../context/InputContext';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const { searchInput } = useContext(InputContext);

  // const planetsHeaders = planets && Object.keys(planets[0])
  //   .filter((header) => header !== 'residents');
  // console.log('PLANETS:', planets);

  const filterSearchInput = planets.filter((planet) => planet.name
    .toLowerCase().includes(searchInput.toLowerCase()));
  console.log('FILTERED:', filterSearchInput);

  const headers = ['name',
    'rotation period',
    'orbital period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface water',
    'population',
    'films',
    'created',
    'edited',
    'url'];

  // console.log('PLANET HEADERS', planetsHeaders);

  return (
    <>
      {/* {planets.map((planet) => (
        <p>{planet.name}</p>
      ))} */}
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
            filterSearchInput.map((planet) => (
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

    </>
  );
}

export default Table;

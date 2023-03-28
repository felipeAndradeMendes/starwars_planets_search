import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);

  return (
    <>
      {/* {planets.map((planet) => (
        <p>{planet.name}</p>
      ))} */}
      <table className="table">
        <thead>
          <tr>
            {Object.keys(planets[0]).map((header) => (
              header !== 'residents'
              && (
                <th key={ header }>
                  { header }
                </th>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {
            planets.map((planet) => (
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

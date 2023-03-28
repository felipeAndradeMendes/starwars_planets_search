// import { useState } from 'react';

import { useContext } from 'react';
import InputContext from '../context/InputContext';

function Filters() {
  const { searchInput, setSearchInput } = useContext(InputContext);

  // const filterSearchInput = planets.filter((planet) => planet.name.includes(searchInput));
  // console.log('FILTERED:', filterSearchInput);

  // useEffect(() => {
  //   setPlanets(filterSearchInput);
  // }, [searchInput]);

  return (
    <>
      <h3>FILTROS</h3>
      <input
        data-testid="name-filter"
        type="text"
        name="inputSearch"
        placeholder="Busca"
        value={ searchInput }
        onChange={ (e) => setSearchInput(e.target.value) }
      />
    </>
  );
}

export default Filters;

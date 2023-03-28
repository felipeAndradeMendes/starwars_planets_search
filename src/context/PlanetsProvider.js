import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      console.log(data.results);
      setPlanets(data.results);
      setLoading(false);
    };
    callApi();
  }, []);

  const context = {
    planets,
    setPlanets,
    loading,
    setLoading,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;

import { useContext, useEffect } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

function Home() {
  const { setPlanets, loading, setLoading } = useContext(PlanetsContext);

  // const planetsWithoutResidents = (list) => {
  //   if (list) {
  //     const newList = list.map((planet) => planet.filter((key) => key !== 'residents'));
  //     console.log('NEW LIST', newList);
  //   }
  // };

  const callApi = async () => {
    setLoading(true);
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    console.log(data.results);
    setPlanets(data.results);
    setLoading(false);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <h1>HOME</h1>
      {loading
        ? <h2>LOADING...</h2>
        : <Table />}
    </>
  );
}

export default Home;

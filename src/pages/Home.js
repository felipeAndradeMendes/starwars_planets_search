import { useContext } from 'react';
import Filters from '../components/Filters';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

function Home() {
  const { loading } = useContext(PlanetsContext);

  // const callApi = async () => {
  //   setLoading(true);
  //   const response = await fetch('https://swapi.dev/api/planets');
  //   const data = await response.json();
  //   console.log(data.results);
  //   setPlanets(data.results);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  return (
    <>
      <h1>HOME</h1>
      <Filters />
      {loading
        ? <h2>LOADING...</h2>
        : <Table />}
    </>
  );
}

export default Home;

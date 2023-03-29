import { useContext } from 'react';
import Filters from '../components/Filters';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

function Home() {
  const { loading } = useContext(PlanetsContext);
  /* renderiza os filtros, mas espera a api preencher a tabela, antes de renderizar */
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

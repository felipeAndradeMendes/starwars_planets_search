import { useState } from 'react';
import PropTypes from 'prop-types';
import InputContext from './InputContext';

function InputProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [combinedFilters, setCombinedFilters] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  // const [columnSort, setColumnSort] = useState([]);
  const [sortOrder, setSortOrder] = useState({ column: 'population', sort: 'ASC' });
  // const [columnsToRender, setColumnsToRender] = useState([]);
  const [sortedPlanetsToRender, setSortedPlanetsToRender] = useState([]);

  const context = {
    searchInput,
    setSearchInput,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    combinedFilters,
    setCombinedFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    // columnSort,
    // setColumnSort,
    sortOrder,
    setSortOrder,
    sortedPlanetsToRender,
    setSortedPlanetsToRender,
  };

  return (
    <InputContext.Provider value={ context }>
      {children}
    </InputContext.Provider>
  );
}

InputProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputProvider;

import { useState } from 'react';
import PropTypes from 'prop-types';
import InputContext from './InputContext';

function InputProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [combinedFilters, setCombinedFilters] = useState([]);

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
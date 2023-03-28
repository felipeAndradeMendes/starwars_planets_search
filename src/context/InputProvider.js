import { useState } from 'react';
import PropTypes from 'prop-types';
import InputContext from './InputContext';

function InputProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');

  const context = {
    searchInput,
    setSearchInput,
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

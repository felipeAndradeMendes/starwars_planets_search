// Opções do select do columnFilter
export const columnOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

// Opções dos headers da tabela
export const headers = ['name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

// Opções do select do comparisonFilter
export const comparisonFilterOptions = [
  'maior que',
  'menor que',
  'igual a',
];

// Tentativas abaixo com unicode:
// console.log('\u003C'); // maior >
// console.log('\u003E'); // menor <
// console.log('\u003D\u003D\u003D'); // igual ===

// const comparisonObj = {
//   'maior que': '\u003C',
//   'menor que': '\u003E',
//   'igual a': '\u003D\u003D\u003D',
// };

// let compSign = '';
// if (comparison === 'maior que') {
//   compSign = '\u003C';
// } else if (comparison === 'menor que') {
//   compSign = '\u003E';
// } else {
//   compSign = '\u003D\u003D\u003D';
// }

// const resetCombinedFilters = () => {
//   // const res = filterByNumericValues.map((option) => {
//   //   const newObj = {
//   //     column: option.column,
//   //     comparison: option.comparison,
//   //     value: option.value,
//   //   };
//   //   return newObj;
//   // });
//   // console.log('***TESTE***:', res);
//   const result = filterByNumericValues.map((item) => planets.filter((planet) => {
//     if (item.comparison === 'maior que') {
//       return !planet[item.column] > Number(item.value);
//     } if (item.comparison === 'menor que') {
//       return !planet[item.column] < Number(item.value);
//     } if (item.comparison === 'igual a') {
//       return !planet[item.column] === item.value;
//     }
//     return planets;
//   }));
//   console.log('***TESTE***', result);
//   // setCombinedFilters(result);

//   // const res = planets.filter
// };

// LOGICA 01
// const resetCombinedFilters = () => {
//   // const res = filterByNumericValues.map((option) => {
//   //   const newObj = {
//   //     column: option.column,
//   //     comparison: option.comparison,
//   //     value: option.value,
//   //   };
//   //   return newObj;
//   // });
//   // console.log('***TESTE***:', res);
//   const result = filterByNumericValues.map((item) => planets.filter((planet) => {
//     if (item.comparison === 'maior que') {
//       return planet[item.column] < Number(item.value);
//     } if (item.comparison === 'menor que') {
//       return planet[item.column] > Number(item.value);
//     } if (item.comparison === 'igual a') {
//       return planet[item.column] !== item.value;
//     }
//     return planets;
//   }));
//   console.log('***TESTE***', result);
//   // setCombinedFilters(result);

//   // const res = planets.filter
// };

// LOGICA 02
// const resetCombinedFilters = (filterToBeDeleted) => {
//   const { column, comparison, value } = filterToBeDeleted[0];
//   const filterComp = planets.filter((planet) => {
//     if (comparison === 'maior que') {
//       return planet[column] < Number(value);
//     } if (comparison === 'menor que') {
//       return planet[column] > Number(value);
//     } if (comparison === 'igual a') {
//       return planet[column] !== value;
//     }
//     return planets;
//   });
// console.log('PLANETS FILTRADOS COM FILTRO DELETADO:', filterComp);
// console.log('ARRAYS ESPALHADOS:', [...combinedFilters, ...filterComp]);
// setCombinedFilters([...combinedFilters, ...filterComp]);
// };

/* Se combinedFilters já tiver algum valor, faz novo filtro a partir desse array.
    Se combined filter não estiver preenchido, filtra a partir dos planetas originais,
    mas sob as condições dos filtros cominados iniciais "population maior que 0".
    Poderia deixar sem esse map dos planetas aoriginais, mas não atrapalhou, eu acho */

// const arrayToMap = combinedFilters.length === 0 ? planets : combinedFilters;
// const filterComp = arrayToMap.filter((planet) => {
//   if (comparisonFilter === 'maior que') {
//     return planet[columnFilter] > Number(valueFilter);
//   } if (comparisonFilter === 'menor que') {
//     return planet[columnFilter] < Number(valueFilter);
//   } if (comparisonFilter === 'igual a') {
//     return planet[columnFilter] === valueFilter;
//   }
//   return arrayToMap;
// });

// const combinedFiltersObj = {
//   column: columnFilter,
//   comparison: comparisonFilter,
//   value: valueFilter,
// };

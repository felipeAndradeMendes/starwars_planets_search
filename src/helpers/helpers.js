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

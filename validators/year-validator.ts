const yearValidator = [
  (year: string | number) =>
    (typeof year === 'number' && year >= 0 && year <= 9999) ||
    (typeof year === 'string' && (year.length === 4 || year.length === 0) && Number.isInteger(+year)) ||
    'Year is not valid',
];

export default yearValidator;

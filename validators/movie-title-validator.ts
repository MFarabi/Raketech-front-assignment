const movieTitleValidator = [(value: string) => (typeof value === 'string' && value.length !== 0) || 'Title cannot be empty'];

export default movieTitleValidator;

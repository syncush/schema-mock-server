const mockData = require('mock-data');

module.exports = (schema) => {
  const { exclusiveMinimum, exclusiveMaximum } = schema;
  const { minimum, maximum } = schema;
  return mockData.integer({
    start: exclusiveMinimum ? minimum + 1 : minimum,
    end: exclusiveMaximum ? maximum - 1 : maximum,
  });
};

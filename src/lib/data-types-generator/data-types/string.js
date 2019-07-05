const mockData = require('mock-data');
const { nullableWrapper, stringFromRegexGenerator } = require('../../../utils');

module.exports = (schema) => {
  const { regex } = schema;
  if (regex) {
    return nullableWrapper(schema.nullable, { generate: () => stringFromRegexGenerator(regex) });
  }
  return nullableWrapper(schema.nullable, mockData.string(schema));
};

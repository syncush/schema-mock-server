const mockData = require('mock-data');
const { nullableWrapper, stringFromRegexGenerator } = require('../../../utils');

module.exports = (schema) => {
  if (!schema.regex) {
    return nullableWrapper(schema.nullable, mockData.string(schema));
  }
  return nullableWrapper(schema.nullable, stringFromRegexGenerator(schema));
};

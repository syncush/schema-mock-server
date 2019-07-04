const { stringFromRegexGenerator, nullableWrapper } = require('../../../utils');

const uuid4Regex = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

module.exports = (schema) => {
  const { nullable } = schema;
  return nullableWrapper(nullable, {
    generate() {
      return stringFromRegexGenerator(uuid4Regex);
    },
  });
};

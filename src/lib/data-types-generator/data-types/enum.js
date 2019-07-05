const { nullableWrapper, generateRandomIntegerInRange } = require('../../../utils');

const enumGenerator = (schema) => ({
  generate() {
    const randomEnumValue = schema.items[generateRandomIntegerInRange(0, schema.items.length)];
    return randomEnumValue;
  },
});

module.exports = (schema) => nullableWrapper(schema.nullable, enumGenerator(schema));

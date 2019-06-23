const { nullableWrapper, generateRandomIntegerInRange } = require('../../../utils');

const enumGenerator = (schema) => ({
  generate() {
    const randomEnumValue = schema[generateRandomIntegerInRange(0, schema.items.length)];
    return randomEnumValue;
  },
});

module.exports = (schema) => nullableWrapper(schema.nullable, enumGenerator);

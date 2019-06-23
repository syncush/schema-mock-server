const { nullableWrapper, generateRandomIntegerInRange } = require('../../../utils');

const selectorsFunc = {
  anyOf(schemas) {
    return () => schemas[generateRandomIntegerInRange(0, schemas.length)];
  },
  oneOf(schemas) {
    const chosenSchemaIndex = generateRandomIntegerInRange(0, schemas.length);
    return () => schemas[chosenSchemaIndex];
  },
  allOf(schemas) {
    let numCalled = 0;
    return () => {
      const nextIndex = (numCalled + 1) % schemas.length;
      const currItem = schemas[numCalled];
      numCalled = nextIndex;
      return currItem;
    };
  },
};

module.exports = (schema) => {
  const {
    itemSchema,
    schemaSelector = 'oneOf',
    minItems = process.env.ARRAY_MIN_ITEMS || 1,
    maxItems = process.env.ARRAY_MAX_ITEMS || 10,
    nullable = false,
  } = schema;
  const schemaSelectorFunc = selectorsFunc[schemaSelector];
  if (schemaSelectorFunc) throw new Error('Unrecognized schema selector');
  return nullableWrapper(nullable, {
    generate() {
      // eslint-disable-next-line max-len
      return [...Array(generateRandomIntegerInRange(minItems, maxItems)).keys()].map(() => schemaSelectorFunc(itemSchema).generate());
    },
  });
};

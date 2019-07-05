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
    schemaSelector = 'oneOf',
    minItems = process.env.ARRAY_MIN_ITEMS || 1,
    maxItems = process.env.ARRAY_MAX_ITEMS || 10,
    nullable = false,
  } = schema;

  let { itemSchema } = schema;

  if (!itemSchema) throw new Error('Bad itemSchema');
  if (maxItems < minItems) {
    throw new Error(`Bad minItems or maxItems, values are minItems=${minItems} maxItems=${maxItems}`);
  }

  if (!Array.isArray(itemSchema) && typeof itemSchema === 'object') {
    itemSchema = [itemSchema];
  }

  const schemaSelectorFunc = selectorsFunc[schemaSelector];
  if (Array.isArray(itemSchema) && !schemaSelectorFunc) throw new Error('Unrecognized schema selector');
  return nullableWrapper(nullable, {
    generate() {
      // eslint-disable-next-line max-len
      return [...Array(generateRandomIntegerInRange(minItems, maxItems)).keys()].map(() => {
        const value = schemaSelectorFunc(itemSchema)().generate();
        return value;
      });
    },
  });
};

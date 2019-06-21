const dataTypesMockers = require('../data-types-generator');

const blackListSchemaTypes = ['object', 'arr', 'array'];

const mocker = (schema) => {
  const { type, options = {}, properties = {} } = schema;
  if (!blackListSchemaTypes.includes(type) && dataTypesMockers[type]) {
    return dataTypesMockers[type](options);
  }
  if (type === 'object') {
    const generationSchema = Object.keys(properties).reduce(
      (prev, curr) => ({ ...prev, [curr]: mocker(properties[curr]) }),
      {},
    );
    return dataTypesMockers.object(generationSchema);
    // return Object.keys(properties).reduce((prev, curr) => ({ ...prev, [curr]: mocker(properties[curr]) }), {});
  }
  if (['array', 'arr'].includes(type)) {
    const {
      itemSchema,
      minItems = process.env.DEFAULT_ARRAY_MIN_ITEMS || 1,
      maxItems = process.env.DEFAULT_ARRAY_MAX_ITEMS || 10,
      schemaSelector = 'anyOf',
    } = schema;
    if (!itemSchema || minItems > maxItems || minItems < 0) {
      return new Error('Bad arguments for array schema');
    }
    if (!Array.isArray(itemSchema) && typeof itemSchema === 'object') {
      return dataTypesMockers.array(mocker(itemSchema), { minItems, maxItems });
    }
    if (itemSchema.length === 0) {
      return new Error('At least one schema should be specified for array');
    }
    switch (schemaSelector) {
      case 'anyOf': {
        return dataTypesMockers.arrayAnyOf(itemSchema.map((item) => mocker(item)), { minItems, maxItems });
      }
      case 'oneOf': {
        return dataTypesMockers.arrayOneOf(itemSchema.map((item) => mocker(item)), { minItems, maxItems });
      }
      default: {
        return new Error('invaliid schema selector!');
      }
    }
  }
  return new Error(`No support for data type ${type}`);
};

const mockerGenerateInstance = (generatorTree) => {
  if (typeof generatorTree === 'object' && !generatorTree.generate) {
    return Object.keys(generatorTree).reduce(
      (prev, curr) => ({ ...prev, [curr]: mockerGenerateInstance(generatorTree[curr]) }),
      {},
    );
  }
  return generatorTree.generate();
};

module.exports = (schema) => mockerGenerateInstance(mocker(schema));

const dataTypesMockers = require('../data-types-generator');

const blackListSchemaTypes = ['object', 'arr', 'array'];

const mocker = (schema) => {
  const { type, properties = {} } = schema;
  if (!blackListSchemaTypes.includes(type) && dataTypesMockers[type]) {
    return dataTypesMockers[type](schema);
  }
  if (type === 'object') {
    const generationSchema = Object.keys(properties).reduce(
      (prev, curr) => ({ ...prev, [curr]: mocker(properties[curr]) }),
      {},
    );
    return dataTypesMockers.object({ ...schema, properties: generationSchema });
  }

  if (['array', 'arr'].includes(type)) {
    const { itemSchema, minItems, maxItems } = schema;
    if (!itemSchema || minItems > maxItems || minItems < 0) {
      return new Error('Bad arguments for array schema');
    }

    if (Array.isArray(itemSchema) && itemSchema.length === 0) {
      return new Error('At least one schema should be specified for array');
    }

    const generationSchema = {
      ...schema,
      maxItems,
      minItems,
      itemSchema: Array.isArray(itemSchema) ? itemSchema.map((item) => mocker(item)) : mocker(itemSchema),
    };
    return dataTypesMockers.array(generationSchema);
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

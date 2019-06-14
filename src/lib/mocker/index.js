const dataTypesMockers = require('../data-types-generator');
const blackListSchemaTypes = ['object', 'arr', 'array'];

const mocker = (schema) => {
  const { type, options = {}, properties = {} } = schema;
  if (!blackListSchemaTypes.includes(type) && dataTypesMockers[type]) {
    return dataTypesMockers[type](options);
  }
  if (type === 'object') {
    return Object.keys(properties).reduce((prev, curr) => ({ ...prev, [curr]: mocker(properties[curr]) }), {});
  }
  if (['array', 'arr'].includes(type)) {
    const {
      itemSchema,
      minItems = process.env.DEFAULT_ARRAY_MIN_ITEMS || 1,
      maxItems = process.env.DEFAULT_ARRAY_MAX_ITEMS || 10,
    } = schema;
    if (!itemSchema || minItems > maxItems || minItems < 0) {
      return new Error('Bad arguments for array schema');
    }
    return dataTypesMockers.array(mocker(itemSchema), { minItems, maxItems });
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

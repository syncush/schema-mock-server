const dataTypesMockers = require('../data-types-generator');

const mocker = (schema) => {
  const { type, options = {}, properties = {} } = schema;
  if (type !== 'object' && dataTypesMockers[type]) {
    return dataTypesMockers[type](options);
  }
  if (type === 'object') {
    // eslint-disable-next-line prettier/prettier
    return Object.keys(properties).reduce((prev, curr) => ({ ...prev, [curr]: mocker(properties[curr]) }), {});
  }
  return new Error('Not support data type');
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

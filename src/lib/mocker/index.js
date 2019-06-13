const mockData = require('mock-data');

const mockerGenericFunction = (type, options) => mockData[type](options);

const dataTypesMockers = {
  integer: (options) => mockerGenericFunction('integer', options),
  string: (options) => mockerGenericFunction('string', options),
  ipv4: (options) => mockerGenericFunction('ipv4', options),
  boolean: (options) => mockerGenericFunction('boolean', options),
  date: (options) => mockerGenericFunction('date', options),
};

const mocker = (schema) => {
  const { type, options = {}, properties = {} } = schema;
  if (type !== 'object' && dataTypesMockers[type]) {
    return dataTypesMockers[type](options);
  }
  if (type === 'object') {
    //   const meow = {};
    //   Object.keys(properties).forEach((prop) => {
    //    const temp = {};
    //    temp[prop] = mocker(schema[prop])
    //   })
    // eslint-disable-next-line prettier/prettier
    return Object.keys(properties).reduce((prev, curr) => ({ ...prev, [curr]: mocker(properties[curr]) }), {});
  }
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

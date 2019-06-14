const mockData = require('mock-data');
const RandExp = require('randexp');

const mockerGenericFunction = (type, options) => mockData[type](options);

const stringFromRegexGenerator = (options) => {
  const { regex } = options;
  return {
    generate() {
      return new RandExp(regex).gen();
    },
  };
};

module.exports = {
  integer: (options) => mockerGenericFunction('integer', options),
  string: (options) => {
    if (!options.regex) {
      return mockerGenericFunction('string', options);
    }
    return stringFromRegexGenerator(options);
  },
  ipv4: (options) => mockerGenericFunction('ipv4', options),
  boolean: (options) => mockerGenericFunction('boolean', options),
  date: (options) => mockerGenericFunction('date', options),
};

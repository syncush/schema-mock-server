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

const generateRandomIntegerInRange = (min, max) => Math.floor(Math.random(min) * (max - min) + min);
const generateObject = (schemaObectType) => {
  return {
    generate() {
      return Object.keys(schemaObectType).reduce(
        (acc, curr) => ({ ...acc, [curr]: schemaObectType[curr].generate() }),
        {},
      );
    },
  };
};

module.exports = {
  integer: (options) => mockerGenericFunction('integer', options),
  ipv4: (options) => mockerGenericFunction('ipv4', options),
  boolean: (options) => mockerGenericFunction('boolean', options),
  date: (options) => mockerGenericFunction('date', options),
  object: (schema) => generateObject(schema),
  string: (options) => {
    if (!options.regex) {
      return mockerGenericFunction('string', options);
    }
    return stringFromRegexGenerator(options);
  },
  array: (itemScheam, options) => {
    const { minItems, maxItems } = options;
    return {
      generate() {
        return [...Array(generateRandomIntegerInRange(minItems, maxItems)).keys()].map(() => itemScheam.generate());
      },
    };
  },
};

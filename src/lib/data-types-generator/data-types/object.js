const { nullableWrapper, tossACoin } = require('../../../utils');

const generateObject = (schema) => {
  const { properties } = schema;
  const { required = Object.keys(properties) } = schema;
  return {
    generate() {
      return Object.keys(properties).reduce((acc, curr) => {
        if (required.includes(curr) || tossACoin()) {
          return { ...acc, [curr]: properties[curr].generate() };
        }
        return acc;
      }, {});
    },
  };
};

module.exports = (schema) => nullableWrapper(schema.nullable, generateObject(schema));

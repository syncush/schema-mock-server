const mockFactory = require('../lib/mocker');

module.exports = {
  jsonSchemaFaker(schema, count) {
    return Promise.resolve([...Array(count).keys()].map(() => mockFactory(schema)));
  },
};

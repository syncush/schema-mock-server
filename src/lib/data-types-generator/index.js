const integer = require('./data-types/integer');
const array = require('./data-types/array');
const boolean = require('./data-types/boolean');
const ipv4 = require('./data-types/ipv4');
const ipv6 = require('./data-types/ipv6');
const uuid4 = require('./data-types/uuid4');
const string = require('./data-types/string');
const object = require('./data-types/object');
const date = require('./data-types/date');
const enumGenerator = require('./data-types/enum');

module.exports = {
  integer,
  array,
  boolean,
  date,
  ipv4,
  ipv6,
  uuid4,
  string,
  object,
  enum: enumGenerator,
};

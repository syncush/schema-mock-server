const RandExp = require('randexp');

const tossACoin = () => Math.random() >= 0.5;

module.exports = {
  tossACoin: ,
  generateRandomIntegerInRange: (min, max) => Math.floor(Math.random(min) * (max - min) + min),
  stringFromRegexGenerator: (regex) => new RandExp(regex).gen(),
  nullableWrapper: (nullable, wrappedObject) => {
    if (nullable && tossACoin()) {
      return {
        generate() {
          return null;
        },
      };
    }
    return wrappedObject;
  },
};

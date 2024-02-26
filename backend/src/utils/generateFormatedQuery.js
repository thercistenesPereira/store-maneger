const snakeize = require('snakeize');

const generateFormattedQuery = (object) => Object.keys(snakeize(object))
  .map((key) => `${key} = :${key}`)
  .join(', ');
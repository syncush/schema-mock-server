const controller = require('../controller');

module.exports = {
  mockMiddleware(req, res, next) {
    const {
      locals: { count = 1 },
    } = res;
    const {
      body: { schema },
    } = req;
    res.locals.mockedData = controller.jsonSchemaFaker(schema, count);
    next();
  },
  getCountMiddleware(req, res, next) {
    const { query, params, body } = req;
    res.locals.count = query.count || params.count || (body && body.count) || process.env.DEFAULT_COUNT || 1;
    res.locals.count = +res.locals.count;
    next();
  },
  sendResultToClient(_, res) {
    res.locals.mockedData.then((data) => res.status(200).send(data));
  },
};

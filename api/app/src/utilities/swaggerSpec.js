const swaggerjsdoc = require('swagger-jsdoc');
const fs = require('fs');
const deref = require('deref');
const schemas = require('./../schemas/schemas.json');

module.exports = function() {
  const apis = fs.readdirSync('./app/src/routes/routers/').map(x => `./app/src/routes/routers/${x}`);

  let options = {
    swaggerDefinition: {
      swagger: '2.0',
      info: {
        version: '0.0.1',
        title: 'UA'
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    apis
  };

  let swaggerSpec = swaggerjsdoc(options);
  let schemaDefs = Object.assign(
    {},
    schemas.definitions
  );

  swaggerSpec.definitions = deref()({definitions: schemaDefs}, true).definitions;
  if (!fs.existsSync('./app/src/swagger/')) {
    fs.mkdirSync('./app/src/swagger/');
  }
  let swaggerDocument = JSON.stringify(swaggerSpec, null, 4);
  fs.writeFileSync('./app/src/swagger/swagger_spec.json', swaggerDocument, {mode: 0o0777});
  return swaggerDocument;
};

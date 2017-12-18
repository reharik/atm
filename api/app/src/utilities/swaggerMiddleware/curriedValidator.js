const swaggermodelvalidator = require('./swaggermodelvalidator');

module.exports = function(document, customValidators) {
  const validator = new swaggermodelvalidator(document);
  if (customValidators) {
    if (!Array.isArray(customValidators)) {
      customValidators = [customValidators];
    }
    customValidators.forEach(x => validator.addFieldValidator(x.name, x.validator));
  }
  return function(schema) {
    return function(value) {
      return validator.validate(value, schema, document.definitions, true);
    };
  };
};

const BadRequestError = require('./bad-request-error');
const NotFoundError = require('./not-found-error');
const ConflictError = require('./conflict-error');
const AuthorizationError = require('./authorization-error');
const ForbiddenError = require('./forbidden-error');

module.exports.AuthorizationError = AuthorizationError;
module.exports.BadRequestError = BadRequestError;
module.exports.NotFoundError = NotFoundError;
module.exports.ConflictError = ConflictError;
module.exports.ForbiddenError = ForbiddenError;

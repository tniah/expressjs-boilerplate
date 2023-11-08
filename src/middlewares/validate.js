import {pick} from '../utils/pick';
import Joi from 'joi';
import httpStatus from 'http-status';
import ApiError from '../utils/error';

export const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const payload = pick(req, Object.keys(validSchema));
  const {value, error} = Joi.compile(validSchema)
    .prefs({errors: {label: 'key'}, abortEarly: false, allowUnknown: true, stripUnknown: true})
    .validate(payload);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

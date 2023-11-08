import Joi from 'joi';
import {validateId} from './custom.validation';

export const getUsers = {
  query: Joi.object().keys({
    limit: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .default(50),
    offset: Joi.number()
      .integer()
      .min(0)
      .default(0),
  }),
}

export const createUser = {
  body: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    name: Joi.string(),
  }),
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validateId),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validateId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    password: Joi.string()
      .min(6)
      .max(255),
    isActive: Joi.boolean(),
  }),
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validateId),
  }),
};
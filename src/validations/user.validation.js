import Joi from 'joi';

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
  })
}
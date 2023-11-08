import Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, '../../.env')});

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('test', 'development', 'production').required(),
    MONGODB_URL: Joi.string().required().description('Mongo database URL'),
  })
  .unknown();

const {value: envVars, error} = envSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const appConfig = {
  env: envVars.NODE_ENV,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {},
  },
};
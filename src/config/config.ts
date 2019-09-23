import * as dotenv from 'dotenv';

dotenv.config();

export default {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '3000',

  DB_MONGO_DIALECT: process.env.DB_MONGO_DIALECT || 'mongo',
  DB_MONGO_HOST: process.env.DB_MONGO_HOST || 'papaya-b',
  DB_MONGO_PORT: process.env.DB_MONGO_PORT || '27031',
  DB_MONGO_NAME: process.env.DB_MONGO_NAME || 'OPSMONGO',
  DB_MONGO_USER: process.env.DB_MONGO_USER || 'OPSMONGO',
  DB_MONGO_PASSWORD: process.env.DB_MONGO_PASSWORD || 'pA_r3MP3004',

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_please_change',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,

  SNOW_URL:process.env.SNOW_URL || 'https://ipaasapi-dev.corp.adobe.com',
  SNOW_GRANT_TYPE:process.env.SNOW_GRANT_TYPE || 'password',
  SNOW_CLIENT_ID:process.env.SNOW_CLIENT_ID || '388456b098ef37805c801381ae1d9fdb',
  SNOW_CLIENT_SECRET:process.env.SNOW_CLIENT_SECRET || ':gCdq?0CWx',
  SNOW_USERNAME:process.env.SNOW_USERNAME || 'srv_rpasdg',
  SNOW_PASSWORD:process.env.SNOW_PASSWORD || 'sdg!48',
  SNOW_API_KEY:process.env.SNOW_API_KEY || 'l7xx48654bd474d645119b89437f79ab3f18'
};

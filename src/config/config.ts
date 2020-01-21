import { config } from "dotenv"
import { resolve } from "path"

config({ path: resolve(__dirname, "../../.env") })

export default {
  URL:process.env.OPS_URL,
  APP: process.env.OPS_APP,
  PORT: Number(process.env.OPS_PORT),
  EXPRESS_SESSION: process.env.OPS_EXPRESS_SESSION,
  ADMIN_CLIENT_TOKEN: Number(process.env.OPS_ADMIN_CLIENT_TOKEN),
  ENCRYPTION_SALT: Number(process.env.OPS_ENCRYPTION_SALT),

  DB_MONGO_DIALECT: process.env.OPS_DB_MONGO_DIALECT,
  DB_MONGO_HOST: process.env.OPS_DB_MONGO_HOST,
  DB_MONGO_PORT: process.env.OPS_DB_MONGO_PORT,
  DB_MONGO_NAME: process.env.OPS_DB_MONGO_NAME,
  DB_MONGO_USER: process.env.OPS_DB_MONGO_USER,
  DB_MONGO_PASSWORD: process.env.OPS_DB_MONGO_PASSWORD,

  JWT_ENCRYPTION: process.env.OPS_JWT_ENCRYPTION,
  JWT_EXPIRATION: Number(process.env.OPS_JWT_EXPIRATION)
};

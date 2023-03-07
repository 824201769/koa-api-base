/**
 * 配置信息
 */
const config = {
  server: {
    PROT: process.env.PORT,
  },
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME as string,
    DB_PROT: process.env.DB_PROT as unknown as number,
    DB_DEBUG: process.env.DB_DEBUG as unknown as boolean,
  },
  jest: {
    JEST_PORT: process.env.JEST_PORT,
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
  },
  logger:{
    LOGGER_OPNE: process.env.LOGGER_OPNE,
  },
  sms:{
    ACCESSKEYID: process.env.SMS_ACCESSKEYID,
    SECRETACCESSKEY:process.env.SMS_SECRETACCESSKEY,
  },
  redis:{
    URL: process.env.REDIS_URL,
    PASSWORD:process.env.REDIS_PASSWORD,
    HOST: process.env.REDIS_HOST,
  }
};
export default config;

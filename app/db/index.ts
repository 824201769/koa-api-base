import path from "path";
import { Sequelize } from "sequelize-typescript";
import config from "../config";

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASSWORD,
  {
    host: config.db.DB_HOST,
    port: config.db.DB_PROT,
    dialect: "mysql",
    timezone: "+08:00", //更改为中国时区
    models: [
      path.join(__dirname, "..", "model/**/*.ts"),
      path.join(__dirname, "..", "model/**/*.js"),
    ],
    dialectOptions: {
      charset: "utf8mb4",
    },
    define: {
      freezeTableName: true, //固定表名
      paranoid: true, //开启软删除
      underscored: true, //开启下划线
      charset: "utf8", //编码
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
    pool: {
      min: 0,
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
  }
);
const db = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("数据库初始化成功");
  } catch (error) {
    console.log("数据库初始化失败",error);
  }
};
export default db;

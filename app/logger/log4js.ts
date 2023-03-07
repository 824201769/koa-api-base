import log4js from "log4js";
import path from "path";
import fs from "fs";
import moment from "moment";

const date = moment().format("YYYY-MM-DD");
const basePath = path.join(__dirname, `../../logs/${date}`);
const errorFilename = `${basePath}/errors/error`;
const successFilename = `${basePath}/success/success`;
const dbInfoFilename = `${basePath}/dninfo/success`;

log4js.configure({
  appenders: {
    errorLog: {
      type: "dateFile", //日志类型
      filename: errorFilename, //日志输出位置
      alwaysIncludePattern: true, //是否总是有后缀名
      pattern: "yyyy-MM-dd-hh.log", //后缀，每小时创建一个新的日志文件
      encoding: "utf-8", //default "utf-8"，文件的编码
    },
    successLog: {
      type: "dateFile",
      filename: successFilename,
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd-hh.log",
      encoding: "utf-8", //default "utf-8"，文件的编码
    },
    dbinfoLog: {
      type: "dateFile",
      filename: dbInfoFilename,
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd-hh.log",
      encoding: "utf-8", //default "utf-8"，文件的编码
    },
  },
  categories: {
    errorLog: { appenders: ["errorLog"], level: "error" },
    successLog: { appenders: ["successLog"], level: "info" },
    dbinfoLog: { appenders: ["dbinfoLog"], level: "info" },
    default: { appenders: ["successLog", "errorLog","dbinfoLog"], level: "trace" },
  },
  // pm2: true,
  // pm2InstanceVar: 'INSTANCE_ID',
  disableClustering: true,
});

export default log4js;

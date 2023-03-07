import log4js from "./log4js";
const errorLog = log4js.getLogger("errorLog"); //此处使用category的值
const successLog = log4js.getLogger("successLog"); //此处使用category的值

let log: any = {};
//访问日志
log.ACCESS =  (req: any, resTime: any)=> {
  if (req) {
    successLog.info(formatRes(req, resTime));
  }
};
//错误日志
log.ERROR =  (ctx: any, error: any, resTime: any) =>{
  if (ctx && error) {
    errorLog.error(formatError(ctx, error, resTime));
  }
};

//格式化请求日志
const formatReqLog = function (req: any, resTime: string) {
  const getClientIp = function (req: any) {
    return (
      req.headers["x-forwarded-for"] ||
      req.header.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress ||
      ""
    );
  };
  let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
  let logText = new String();
  //访问方法
  let method = req.method;
  logText += "请求方式: " + method + "\n";
  //请求原始地址
  logText += "请求URL:  " + req.originalUrl + "\n";
  //客户端ip
  logText += "请求IP:  " + ip + "\n";
  //请求参数
  if (method === "GET") {
    logText += "请求参数Query:  " + JSON.stringify(req.request.query) + "\n";
  } else {
    logText +=
      "请求参数Body: " + "\n" + JSON.stringify(req.request.body) + "\n";
  }
  //服务器响应时间
  logText += "响应: " + resTime + "\n";
  return logText;
};

//格式化响应日志
const formatRes = function (res: any, resTime: string) {
  let logText = new String();
  //响应日志开始
  logText += "\n" + "*************** response log start ***************" + "\n";
  //添加请求日志
  logText += formatReqLog(res, resTime).toString();
  //响应状态码
  logText += "返回状态码: " + res.res.statusCode + "\n";
  //响应内容
  logText += "返回数据: " + "\n" + JSON.stringify(res.body) + "\n";
  //响应日志结束
  logText += "*************** response log end ***************" + "\n";
  return logText;
};

//格式化错误日志
const formatError = function (ctx: any, err: any, resTime: string) {
  let logText = new String();
  //错误信息开始
  logText += "\n" + "*************** error log start ***************" + "\n";
  //添加请求日志
  logText += formatReqLog(ctx, resTime).toString();
  //错误名称
  logText += "错误名称: " + err.name + "\n";
  //错误信息
  logText += "错误详情: " + err.message + "\n";
  //错误详情
  logText += "错误Stack: " + err.stack + "\n";
  //错误信息结束
  logText += "*************** error log end ***************" + "\n";
  return logText;
};

export default log;

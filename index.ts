import run from "./app";
import config from "./app/config";
 
try {
  run(config.server.PROT);
  console.log("服务器启动成功:", config.server.PROT);
} catch (error) {
  console.log("服务启动失败:", error);
}

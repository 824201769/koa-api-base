import Koa, { Context, Next } from "koa";
import { koaBody } from "koa-body";
import cors from "koa2-cors";
import path from "path";
import fs from "fs";
import { Server } from "http";
import KoaStatic from "koa-static";
import koaJson from "koa-json";
import "dotenv/config";
import logger from "./logger";
import { deleteLogger } from "./utils/dir";
import config from "./config";
import { Authority } from "./middleware/Authority";
import db from "./db";
const app = new Koa();
db();

app.use(
  cors({
    origin: function (ctx) {
      if (ctx.url) {
        return "*"; // 允许来自所有域名请求
      }
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(
  koaBody({
    multipart: true,
    jsonLimit: "300mb",
    formidable: {
      maxFileSize: 300000000,
    },
  })
);
app.use(koaJson());
app.use(KoaStatic(path.join(__dirname + "/public")));
app.use(KoaStatic(path.join(__dirname + "/upload")));
//不需要鉴权理由
const unlessPath = ["/api/userList", "/api/register"];

app.use(async (ctx: Context, next: Next) => {
  const start = new Date().getTime();
  let ms;
  try {
    if (unlessPath.includes(ctx.url)) {
      await next();
    } else {
      await Authority(ctx, next);
    }
    ms = new Date().getTime() - start;
    //记录响应日志
    config.logger.LOGGER_OPNE && logger.ACCESS(ctx, ms);
  } catch (error) {
    ms = new Date().getTime() - start;
    //记录异常日志
    config.logger.LOGGER_OPNE && logger.ERROR(ctx, error, ms);
  }
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const initRouters = (path: string = `${__dirname}/router`) => {
  let files = fs.readdirSync(path);
  files.forEach((item) => {
    if (item[0] !== ".") {
      if (item.endsWith(".ts") || item.endsWith(".js")) {
        import(`${path}/${item}`)
          .then((router) => {
            console.log("初始化路由: ", item);
            app
              .use(router.default.routes())
              .use(router.default.allowedMethods());
          })
          .catch((error) => {
            console.log("错误路由: ", path, " : ", item);
            console.log("错误信息: ", error);
          });
      } else {
        initRouters(`${path}/${item}`);
      }
    }
  });
};

initRouters();
deleteLogger();
const run = (port: any): Server => {
  return app.listen(port);
};
export default run;

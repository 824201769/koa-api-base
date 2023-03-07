import { Context, Next } from "koa";
import {verify} from 'jsonwebtoken';
import config from "../config";
import { TokenUser } from "../config/serverData";

export const Authority = async (ctx: Context, next: Next) => {
  const token = ctx.headers["Authorization"] as string;
  if (!token) {
    ctx.status = 401;
    return;
  }
  let jwtUser
  try {
    //解密
    jwtUser=verify(token,config.jwt.JWT_SECRET)
    if(!jwtUser){
      ctx.status = 401;
      return;
    }
    await next()
  } catch (error) {
    ctx.status = 401;
    return;
  }
};

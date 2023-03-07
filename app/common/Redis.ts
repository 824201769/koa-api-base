import { createClient } from "redis";
import config from "../config";
class Redis {
  private client: any;
  constructor() {
    this.client = createClient({
      legacyMode: true,
      url: "redis:" + config.redis.URL + ":" + config.redis.HOST,
      password: config.redis.PASSWORD,
    });
    this.client.on("error", (err: any) => {
      console.log("redis启动错误:===", err);
    });
    this.client.connect();
    this.client.ping();
  }

  /**
   *
   * @param {string} key
   * @returns {Promise<string>}
   */
  async get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.get(key, function (err: any, data: any) {
        resolve(data);
      });
    });
  }

  /**
   *
   * @param {string} key
   * @param {string} value
   * @param {number} exprires 过期时间 seconds
   */
  async set(key: string, value: string, exprires: number): Promise<any> {
    return new Promise((res, rej) => {
      this.client.set(key, value, function (err: any, data: unknown) {
        res(data);
      });
      if (exprires) {
        this.client.expire(key, exprires);
      }
    });
  }

  /**
	 * 
	 * @param {string} key 
	 
	 */
  async del(key: string) {
    return new Promise((res, rej) => {
      this.client.del(key, function (err: any, data: unknown) {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
  }
}
export default new Redis();

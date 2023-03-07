import run from "../app";
import { Server } from "http";
import request from "supertest";
import config from '../app/config';
/**
 * http网络单元测试
 */
describe("http", () => {
  let server: Server;
  beforeAll(() => {
    // 运行程序端口自不可以和当前端口一致
    server = run(config.jest.JEST_PORT);
  });
  // 要测试的接口名称
  it("GET  /api", () => {
    // 请求的路径
    return request(server)
      .get("/api")
      .expect(200) //测试状态码
      .then((res) => {
        //测试返回值
        expect(res.body).toStrictEqual([1, 2, 3, 4, 5]);
      });
  });
  // 运行完毕后,关闭服务
  afterAll(async () => {
    server.close();
  });
});

import fs from "fs";
import path from "path";
import schedule from "node-schedule";
import moment from "moment";
/**
 * 删除文件夹
 * @param logpath
 */
const deleteDir = (logpath: string) => {
  let files = [];
  if (fs.existsSync(logpath)) {
    files = fs.readdirSync(logpath);
    files.forEach((file: any, index: any) => {
      let curPath: string = logpath + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(logpath); // 删除文件夹自身
  }
};
const deleteLogger = () => {
  let date = moment().format("YYYY-MM-DD");
  let datetime = moment(date).valueOf();
  let deleteDate = datetime - 172800000;
  let date_ = moment(deleteDate).format("YYYY-MM-DD");
  let logpath = path.resolve(__dirname, `../../logs/${date_}`);
  console.log("开始执行日志删除任务", logpath);
  //每天的凌晨3点3分30秒触发
  const schedule_ = schedule.scheduleJob("30 3 3 * * *", function () {
    deleteDir(logpath);
  });
};
export {deleteLogger}

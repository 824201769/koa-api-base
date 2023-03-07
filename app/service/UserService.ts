import { User } from "../model/User";
import { PAGE } from "../db/page";
class UserService {
  getUserList = ( page = 1,pageSize = 15,) => {
    return User.findAndCountAll({
      offset: PAGE(page,pageSize),
      limit:pageSize,
    });
  };
}

export default new UserService();

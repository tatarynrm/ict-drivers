import $api from "../utils/axios";
import { AxiosResponse } from "axios";

export default class UserService {
  static fetchUsers() {
    return $api.get('/users')
  }

}

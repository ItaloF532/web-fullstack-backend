import CryptoJS from "crypto-js";
import { SALT } from "../constants/index.js";

export default class EncriptUtil {
  static encript(password) {
    console.log(password);
    return CryptoJS.SHA256(password + SALT).toString();
  }
}

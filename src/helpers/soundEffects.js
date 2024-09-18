import register_success from "../assets/sounds/success.mp3";
import register_error from "../assets/sounds/error.mp3";


export const soundUserRegisterSuccess = () => {
  let snd = new Audio(register_success);
  snd.volume = 0.6;
  snd.play();
};
export const soundUserRegisterError = () => {
  let snd = new Audio(register_error);
  snd.volume = 0.2;
  snd.play();
};
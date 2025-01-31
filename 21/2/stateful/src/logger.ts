import { GameManager, games } from "./store";

export function logger() {
  setInterval(() => {
    console.log(GameManager.getInstance().log());
  }, 5000);
}

import { gameManager, games } from "./store";

export function logger() {
  setInterval(() => {
    console.log(gameManager.log());
  }, 5000);
}

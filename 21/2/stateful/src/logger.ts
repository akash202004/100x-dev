import { games } from "./store";

export function logger() {
  setInterval(() => {
    console.log(games);
  }, 5000);
}

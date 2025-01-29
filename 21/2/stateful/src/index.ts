import { logger } from "./logger";
import { gameManager, games } from "./store";

logger();

// bad approach
// setInterval(() => {
//   games.push({
//     id: Math.random().toString(),
//     whitePlayer: "alice",
//     blackPlayer: "Ram",
//     moves: [],
//   });
// }, 5000);

// slightly better approach
setInterval(() => {
  gameManager.addGame(Math.random().toString());
}, 5000);

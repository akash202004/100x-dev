import { logger } from "./logger";
import { GameManager, games } from "./store";

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
  GameManager.getInstance().addGame(Math.random().toString());
}, 5000);

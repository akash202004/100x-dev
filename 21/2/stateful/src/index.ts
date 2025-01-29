import { logger } from "./logger";
import { games } from "./store";

logger();

setInterval(() => {
  games.push({
    id: Math.random().toString(),
    whitePlayer: "alice",
    blackPlayer: "Ram",
    moves: [],
  });
}, 5000);

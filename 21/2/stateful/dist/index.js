"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const store_1 = require("./store");
(0, logger_1.logger)();
// setInterval(() => {
//   games.push({
//     id: Math.random().toString(),
//     whitePlayer: "alice",
//     blackPlayer: "Ram",
//     moves: [],
//   });
// }, 5000);
setInterval(() => {
    store_1.gameManager.addGame(Math.random().toString());
}, 5000);

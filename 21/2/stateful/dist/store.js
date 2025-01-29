"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = exports.GameManager = exports.games = void 0;
exports.games = [];
const GameManager = class {
    constructor() {
        this.games = [];
        this.games = exports.games;
    }
    addMove(gameId, moves) {
        const game = this.games.find((games) => games.id === gameId);
        game === null || game === void 0 ? void 0 : game.moves.push(moves);
        console.log(`Adding moves`);
    }
    addGame(gameId) {
        const game = {
            id: gameId,
            whitePlayer: "Alice",
            blackPlayer: "Ravi",
            moves: [],
        };
        this.games.push(game);
    }
    removeGame(gameId) {
        this.games = this.games.filter((game) => game.id !== gameId);
        console.log(`Game removed: ${gameId}`);
    }
    log() {
        console.log(this.games);
    }
};
exports.GameManager = GameManager;
exports.gameManager = new exports.GameManager();

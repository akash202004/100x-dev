interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

// bad approach
export const games: Game[] = [];

// slightly better approach
export const GameManager = class {
  games: Game[] = [];
  constructor() {
    this.games = games;
  }

  addMove(gameId: string, moves: string) {
    const game = this.games.find((games) => games.id === gameId);
    game?.moves.push(moves);
    console.log(`Adding moves`);
  }

  addGame(gameId: string) {
    const game = {
      id: gameId,
      whitePlayer: "Alice",
      blackPlayer: "Ravi",
      moves: [],
    };

    this.games.push(game);
  }

  removeGame(gameId: string) {
    this.games = this.games.filter((game) => game.id !== gameId);
    console.log(`Game removed: ${gameId}`);
  }

  log(){
    console.log(this.games);
  }
};

export const gameManager = new GameManager(); 

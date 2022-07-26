import { Amazons, DEFAULT_POSITIONS } from "amazons-game-engine";
import { FEN, Move } from "amazons-game-engine/dist/types";
import { Game } from "boardgame.io";

function Load(fen: FEN) {
  return Amazons(fen);
}
export const AmazonsGame: Game = {
  name: "amazons",

  setup: () => {
    return { fen: DEFAULT_POSITIONS[6] };
  },

  moves: {
    move: (G: any, ctx: any, m: Move) => {
      const amazons = Load(G.fen);
      if (
        (amazons.turn() == "w" && ctx.currentPlayer == "1") ||
        (amazons.turn() == "b" && ctx.currentPlayer == "0")
      ) {
        console.log("wrong player");
        return { ...G };
      }
      amazons.move(m);
      return { fen: amazons.fen() };
    },
    random_move: (G: any, ctx: any) => {
      const amazons = Load(G.fen);
      amazons.random_move();
      return { fen: amazons.fen() };
    },
  },

  turn: {
    minMoves: 2,
    maxMoves: 2,
  },

  endIf: (G, ctx) => {
    const amazons = Load(G.fen);
    if (amazons.game_over()) return amazons.turn(true);
  },
};

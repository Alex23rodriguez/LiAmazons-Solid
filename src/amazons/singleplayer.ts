import { Amazons } from "amazons-game-logic";
import type { FEN, Move } from "amazons-game-logic/dist/types";
import { Game } from "boardgame.io";

function Load(fen: FEN) {
  let amazons = new Amazons(fen);
  return amazons;
}

let amazons = new Amazons("w1/2/2/1b w - 1");

export const AmazonsGame: Game = {
  name: "amazons",

  setup: () => ({ fen: amazons.fen(), ascii: amazons.ascii() }),

  moves: {
    move: (G: any, ctx: any, m: Move) => {
      const amazons = Load(G.fen);
      if (
        (amazons.turn == "w" && ctx.currentPlayer == "1") ||
        (amazons.turn == "b" && ctx.currentPlayer == "0")
      ) {
        return { ...G };
      }
      amazons.move(m);
      return { fen: amazons.fen() };
    },
  },

  turn: {
    minMoves: 2,
    maxMoves: 2,
  },
};

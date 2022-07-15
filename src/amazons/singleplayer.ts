import { Amazons, DEFAULT_POSITIONS } from "amazons-game-logic";
import type { FEN, Move } from "amazons-game-logic/dist/types";
import { Game } from "boardgame.io";

let amazons = new Amazons(DEFAULT_POSITIONS[8]);
// FOR DEBUGGING ONLY
(window as any).amazons = amazons;

export const AmazonsGame: Game = {
  name: "amazons",

  setup: () => ({ fen: amazons.fen() }),

  moves: {
    move: (G: any, ctx: any, m: Move) => {
      // const amazons = Load(G.fen);
      if (
        (amazons.turn == "w" && ctx.currentPlayer == "1") ||
        (amazons.turn == "b" && ctx.currentPlayer == "0")
      ) {
        console.log("wrong player");
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

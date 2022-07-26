import { Amazons } from "amazons-game-engine";
import { Move } from "amazons-game-engine/dist/types";
import { Game } from "boardgame.io";

let amazons = Amazons(6);
// FOR DEBUGGING ONLY
(window as any).amazons = amazons;

export const AmazonsGame: Game = {
  name: "amazons",

  setup: () => ({ fen: amazons.fen() }),

  moves: {
    move: (G: any, ctx: any, m: Move) => {
      // const amazons = Load(G.fen);
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
      amazons.random_move();
      return { fen: amazons.fen() };
    },
  },

  turn: {
    minMoves: 2,
    maxMoves: 2,
  },

  endIf: (G, ctx) => {
    if (amazons.game_over()) return amazons.turn(true);
  },
};

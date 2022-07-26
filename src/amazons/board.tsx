import { Amazons } from "amazons-game-engine";
import { Square } from "amazons-game-engine/dist/types";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import { createSignal } from "solid-js";
import { Checkerboard } from "./checkerboard";

export function AmazonsBoard({ client }: { client: _ClientImpl }) {
  const { moves } = client;
  let { G: initG, ctx: initCtx } = client.getState() as any;

  const [G, setG] = createSignal(initG);
  const [ctx, setCtx] = createSignal(initCtx);

  client.subscribe((state) => {
    let { G: newG, ctx: newCtx } = state as any;
    setG(newG);
    setCtx(newCtx);
  });

  const onClick = (square: Square) => {
    if (ctx().gameover) return;

    moves.random_move();
    amazons.load(G().fen);
    // amazons.move(G().last_move);
    setPieces(amazons.non_empty_squares());
  };

  const amazons = Amazons(initG.fen);
  (window as any).amazons = amazons;
  const [pieces, setPieces] = createSignal(amazons.non_empty_squares());

  return (
    <>
      <Checkerboard
        onClick={onClick}
        pieces={pieces()}
        size={amazons.size()}
        colorFunc={amazons.square_color}
        width="60vh"
      />
      {ctx().gameover ? <div id="winner">Winner: {ctx().gameover}</div> : ""}
    </>
  );
}

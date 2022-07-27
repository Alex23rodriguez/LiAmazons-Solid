import { Square } from "./square";

import { createEffect, createSignal } from "solid-js";
import { Amazons, coords_to_square } from "amazons-game-engine";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import { Square as TSquare } from "amazons-game-engine/dist/types";

export const AmazonsBoard = (props: { client: _ClientImpl }) => {
  // state
  const [queens, setQueens] = createSignal<{ w: TSquare[]; b: TSquare[] }>({
    w: [],
    b: [],
  });
  const [arrows, setArrows] = createSignal<TSquare[]>([]);
  const [selected, setSelected] = createSignal<TSquare | null>(null);
  const [canMove, setCanMove] = createSignal<TSquare[]>([]);
  const [highlight, setHighlight] = createSignal<TSquare[]>([]);

  let { G: initG, ctx: initCtx } = props.client.getState() as any;

  const [G, setG] = createSignal(initG);
  const [ctx, setCtx] = createSignal(initCtx);

  let amazons = Amazons(G().fen);
  let size = amazons.size();
  let { rows, cols } = size;

  (window as any).canMove = canMove;
  createEffect(() => {
    let fen = G().fen;
    if (fen === amazons.fen()) return;
    amazons = Amazons(fen);
    size = amazons.size();
    ({ rows, cols } = size);
    updateSignals();
  });

  props.client.subscribe((state) => {
    let { G: newG, ctx: newCtx } = state as any;
    setG(newG);
    setCtx(newCtx);
  });

  function index_to_square(index: number) {
    return coords_to_square(
      {
        row: Math.floor(index / size.cols),
        col: index % size.cols,
      },
      size
    );
  }

  function updateSignals() {
    setQueens({ w: amazons.pieces()["w"], b: amazons.pieces()["b"] });
    setArrows(amazons.pieces()["x"]);
  }

  updateSignals();

  let makeClickHandler = (sq: TSquare) => () => {
    if (ctx().gameover) return;

    // TODO: choose based on amazons API
    if (queens()[amazons.turn()].includes(sq) && highlight().length !== 2) {
      // click on queen
      setSelected(sq);

      let poss_squares = amazons.moves_dict()[sq];
      if (typeof poss_squares === "undefined") setCanMove([]);
      else setCanMove(poss_squares);
      setHighlight([sq]);
      return;
    }
    // click on canMove
    if (canMove().includes(sq) && selected() !== null) {
      // update amazons
      amazons.move([selected() as TSquare, sq]);

      props.client.moves.move([selected() as TSquare, sq]);

      updateSignals();

      setHighlight([selected() as TSquare, sq]);
      setSelected(null);

      let poss_squares = amazons.moves().flat();
      setCanMove(poss_squares as TSquare[]);

      return;
    } // place arrow
    if (canMove().includes(sq) && selected() === null) {
      let h = Array.from(highlight());
      h.push(sq);
      amazons.move([sq]);

      props.client.moves.move([sq]);

      updateSignals();

      setCanMove([]);
      setHighlight(h);
      return;
    }
  };

  let square_height = `calc(80vw / ${cols})`;
  let squares = [];
  for (let i = 0; i < cols * rows; i++) {
    let sq = index_to_square(i);
    squares.push(
      <Square
        height={square_height}
        color={
          (highlight().includes(sq) ? "H" : "") +
          (amazons.square_color(sq) === "light" ? 0 : 1)
        }
        queen={
          queens()["w"].includes(sq) ? 1 : queens()["b"].includes(sq) ? 2 : 0
        }
        arrow={arrows().includes(sq) ? true : false}
        onClick={makeClickHandler(sq)}
        canMove={canMove().includes(sq) ? true : false}
      />
    );
  }

  return (
    <div
      style={{
        display: "grid",
        "grid-template-columns": `repeat(${cols}, ${square_height})`,
      }}
    >
      {squares}
    </div>
  );
};

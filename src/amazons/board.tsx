import "./board.css";

import { Square } from "./square";

import { createEffect, createSignal, For } from "solid-js";
import { Amazons, coords_to_square } from "amazons-game-engine";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import { Square as TSquare } from "amazons-game-engine/dist/types";
import { DragDropProvider, DragDropSensors } from "@thisbeyond/solid-dnd";

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
  (window as any).amz = amazons;

  createEffect(() => {
    let fen = G().fen;
    if (fen === amazons.fen()) {
      updateMoves();
      updateSignals();
      return;
    }
    amazons = Amazons(fen);
    size = amazons.size();
    ({ rows, cols } = size);
    updateSignals();
    updateMoves();
    (window as any).amz = amazons;
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

  function updateMoves() {
    // called whenever an update from G happens
    if (amazons.shooting_sq())
      return setCanMove(amazons.moves().flat() as TSquare[]);

    setCanMove([]);
  }

  function updateSignals() {
    setQueens({ w: amazons.pieces()["w"], b: amazons.pieces()["b"] });
    setArrows(amazons.pieces()["x"]);
  }

  const makeClickHandler = (sq: TSquare) => () => {
    if (ctx().gameover) return;

    if (amazons.shooting()) {
      if (canMove().includes(sq)) {
        // place an arrow
        let h = Array.from(highlight());
        h.push(sq);
        amazons.move([sq]);

        props.client.moves.move([sq]);

        setHighlight(h);
      }
      return;
    }

    if (queens()[amazons.turn()].includes(sq) && sq !== selected()) {
      // select a queen
      setSelected(sq);
      const moves = amazons.moves_dict()[selected() as TSquare];
      setCanMove(moves ? moves : []);
      setHighlight([sq]);
      return;
    }
    // move a queen
    if (canMove().includes(sq)) {
      amazons.move([selected() as TSquare, sq]);
      props.client.moves.move([selected() as TSquare, sq]);

      setHighlight([selected() as TSquare, sq]);
      setSelected(sq);

      return;
    }
    setSelected(null);
    setCanMove([]);
    setHighlight([]);
    return;
  };

  let square_height = `calc(80vw / ${cols})`;
  let squares: TSquare[] = [];
  for (let i = 0; i < cols * rows; i++) {
    let sq = index_to_square(i);
    squares.push(sq);
  }

  (window as any).sq = [];

  return (
    <DragDropProvider>
      <DragDropSensors />
      <div
        id="board"
        class="unselectable"
        style={{
          display: "grid",
          "grid-template-columns": `repeat(${cols}, ${square_height})`,
        }}
      >
        <For each={squares}>
          {(sq) => {
            let square = (
              <Square
                name={sq}
                height={square_height}
                color={
                  (highlight().includes(sq) ? "H" : "") +
                  (amazons.square_color(sq) === "light" ? 0 : 1)
                }
                token={
                  queens()["w"].includes(sq)
                    ? "w"
                    : queens()["b"].includes(sq)
                    ? "b"
                    : arrows().includes(sq)
                    ? "x"
                    : canMove().includes(sq)
                    ? "m"
                    : undefined
                }
                onClick={makeClickHandler(sq)}
              />
            );
            (window as any).sq.push(square);
            return square;
          }}
        </For>
      </div>
    </DragDropProvider>
  );
};

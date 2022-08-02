import "./board.css";

import { Square } from "./square";

import { createEffect, createSignal, Index } from "solid-js";
import { Amazons, coords_to_square } from "amazons-game-engine";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import { Square as TSquare } from "amazons-game-engine/dist/types";
import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
} from "@thisbeyond/solid-dnd";

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

  // drag or click functions
  function sendMove(from: TSquare, to: TSquare) {
    amazons.move([from, to]);
    props.client.moves.move([from, to]);
    setHighlight([from, to]);
    setSelected(from);
  }

  function selectQueen(sq: TSquare) {
    // select a queen
    if (sq === selected()) return;

    setSelected(sq);
    const moves = amazons.moves_dict()[sq];
    setCanMove(moves ? moves : []);
    setHighlight([sq]);
    return;
  }

  function unselectQueen() {
    if (selected() === null) return;
    setSelected(null);
    setCanMove([]);
    setHighlight([]);
  }

  let disableUpClickHandler = true;
  let wasSelected = false;

  const makeClickDownHandler = (sq: TSquare) => () => {
    if (ctx().gameover) return;
    disableUpClickHandler = false; // because drag starts after and ends before
    wasSelected = selected() === sq;

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
      selectQueen(sq);
      return;
    }
    // move a queen
    if (canMove().includes(sq)) {
      sendMove(selected()!, sq);
      return;
    }
  };

  const makeClickUpHandler = (sq: TSquare) => () => {
    if (disableUpClickHandler || amazons.shooting() || ctx().gameover) return;

    if (sq !== selected() || wasSelected) {
      unselectQueen();
    }
  };

  let square_height = `calc(min(80vw, 80vh) / ${cols})`;

  const squares_map = new Map(
    Array.from({ length: cols * rows }, (_, i) => [index_to_square(i), ""])
  );

  const get_squares = () => {
    // reset
    squares_map.forEach((_, s) => squares_map.set(s, ""));
    // set values
    queens().b.forEach((s) => squares_map.set(s, "b"));
    queens().w.forEach((s) => squares_map.set(s, "w"));
    arrows().forEach((s) => squares_map.set(s, "x"));
    let shoot = amazons.shooting() ? "y" : "n";
    canMove().forEach((s) => squares_map.set(s, "m" + shoot));
    return squares_map;
  };

  const onDragStart: DragEventHandler = ({ draggable }) => {
    selectQueen(draggable.data.square);
  };

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    disableUpClickHandler = true; // this happens before upClick, so we want to prevent double action
    if (droppable && canMove().includes(droppable.id as TSquare)) {
      sendMove(draggable.data.square, droppable.id as TSquare);
    }
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <DragDropSensors />
      <div
        id="board"
        class="unselectable"
        style={{
          display: "grid",
          "grid-template-columns": `repeat(${cols}, ${square_height})`,
        }}
      >
        <Index each={Array.from(get_squares())}>
          {(entry) => (
            <Square
              name={entry()[0]}
              height={square_height}
              color={
                highlight().includes(entry()[0])
                  ? "bg-yellow-300"
                  : amazons.square_color(entry()[0]) === "light"
                  ? "bg-amber-100"
                  : "bg-green-600"
              }
              active={
                !amazons.shooting() &&
                amazons.turn() === entry()[1] &&
                !ctx().gameover
              }
              token={entry()[1]}
              onMouseDown={makeClickDownHandler(entry()[0])}
              onMouseUp={makeClickUpHandler(entry()[0])}
            />
          )}
        </Index>
      </div>
    </DragDropProvider>
  );
};
